let timer;
let startTime;
let elapsedTime = 0;

// Function to create and show the popup
function showPopup() {
  // Create an overlay div
  let overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '1000';

  // Create a message box
  let messageBox = document.createElement('div');
  let height = window.innerHeight * 0.33; // 33% of the viewport height
  let width = height * (16 / 9); // 16:9 ratio

  messageBox.style.backgroundColor = 'white';
  messageBox.style.display = 'flex';
  messageBox.style.padding = '0';
  messageBox.style.borderRadius = '10px';
  messageBox.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.25)';
  messageBox.style.width = `${width}px`;
  messageBox.style.height = `${height}px`;
  messageBox.style.overflow = 'hidden';

  // Create the left colored section
  let leftSection = document.createElement('div');
  leftSection.style.backgroundColor = '#a3d5d3';
  leftSection.style.width = '35%';
  leftSection.style.display = 'flex';
  leftSection.style.alignItems = 'center';
  leftSection.style.justifyContent = 'center';

  // Create the content section
  let contentSection = document.createElement('div');
  contentSection.style.width = '65%';
  contentSection.style.display = 'flex';
  contentSection.style.flexDirection = 'column';
  contentSection.style.justifyContent = 'center';
  contentSection.style.alignItems = 'center';
  contentSection.style.padding = '20px';

  contentSection.innerHTML = `
    <h2 style="font-size: 24px; margin: 0; margin-bottom: 20px;">Ya llevas ya 10 minutos por aquí...</h2>
    <div style="display: flex; gap: 20px;">
      <button id="acceptButton" style="
        padding: 10px 20px;
        background-color: #a3d5d3; /* Same color as left section */
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      ">OK</button>
      <button id="addTenButton" style="
        padding: 10px 20px;
        background-color: #a3d5d3; /* Same color as left section */
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      ">Añadir otros 10</button>
    </div>
  `;

  // Add sections to the message box
  messageBox.appendChild(leftSection);
  messageBox.appendChild(contentSection);

  // Add the message box to the overlay
  overlay.appendChild(messageBox);
  document.body.appendChild(overlay);

  // Event listeners for buttons
  document.getElementById('acceptButton').onclick = function() {
    chrome.runtime.sendMessage({ action: "closeTab" });
  };

  document.getElementById('addTenButton').onclick = function() {
    document.body.removeChild(overlay);
    startTimer();
  };
}

// Function to start the timer
function startTimer() {
  startTime = Date.now();
  timer = setInterval(checkTime, 1000);
}

// Function to pause the timer
function pauseTimer() {
  clearInterval(timer);
  elapsedTime += Date.now() - startTime;
}

// Function to check the time and show popup if needed
function checkTime() {
  if (elapsedTime + (Date.now() - startTime) >= 600000) { // 10 minutes
    clearInterval(timer);
    showPopup();
  }
}

// Event listeners for page visibility and focus
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    pauseTimer();
  } else {
    startTimer();
  }
});

window.addEventListener('blur', pauseTimer);
window.addEventListener('focus', startTimer);

// Start the initial timer when the page loads
startTimer();
