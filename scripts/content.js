let popup = null;
let selectedText = '';
let extensionEnabled = false;

// Function to show the popup
function showPopup(rect, text) {
  if (!popup) {
    popup = document.createElement('div');
    popup.className = 'highlight-popup';
    document.body.appendChild(popup);
  }
  popup.textContent = text;
  popup.style.left = `${rect.left}px`;
  popup.style.top = `${rect.bottom}px`;
  popup.style.display = 'block';
}

// Function to hide the popup
function hidePopup() {
  if (popup) {
    popup.style.display = 'none';
  }
}

// Always listen for mouseup events, but only act on them if the extension is enabled
document.addEventListener('mouseup', function(event) {
  if (extensionEnabled) {
    console.log("extension enabled")
    selectedText = window.getSelection().toString().trim();
    console.log(`Length of selected text: ${selectedText.length}`);

    if (selectedText.length > 0) {
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      showPopup(rect, selectedText);

      document.addEventListener('mousedown', function onMouseDown() {
        hidePopup();
        selectedText = '';
      }, { once: true });
    } else {
      hidePopup();
    }
  }
});

// Listen for state changes from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  extensionEnabled = request.extensionEnabled;
});

// Load the initial state from storage
chrome.storage.sync.get('extensionEnabled', function(data) {
  extensionEnabled = data.extensionEnabled;
});
