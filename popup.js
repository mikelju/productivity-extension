document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('acceptButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: "closeTab" });
  });

  document.getElementById('addTenButton').addEventListener('click', function() {
    window.close();
  });

  document.getElementById('excludeButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let currentDomain = new URL(tabs[0].url).hostname;
      chrome.storage.local.get({ excludedDomains: [] }, function(data) {
        const excludedDomains = data.excludedDomains;
        if (!excludedDomains.includes(currentDomain)) {
          excludedDomains.push(currentDomain);
          chrome.storage.local.set({ excludedDomains: excludedDomains }, function() {
            window.close();
          });
        }
      });
    });
  });
});
