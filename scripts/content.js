let popup = null;
let selectedText = '';

// Function to show the popup
function showPopup(rect, text) {
  if (!popup) {
    popup = document.createElement('div');
    popup.className = 'highlight-popup';
    document.body.appendChild(popup);
  }
  popup.textContent = text;
  popup.style.left = `${rect.left}px`;
  popup.style.top = `${rect.bottom}px`;  // Positioning it below the selected text
  popup.style.display = 'block';
}

// Function to hide the popup
function hidePopup() {
  if (popup) {
    popup.style.display = 'none';
  }
}

document.addEventListener('mouseup', function(event) {
  selectedText = window.getSelection().toString().trim();
  console.log(selectedText);  // Displaying the selected text in the console

  if (selectedText.length > 0) {
    console.log(`Length of selected text: ${selectedText.length}`);
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();
    showPopup(rect, selectedText);

    // Remove the popup when mouse is down (to allow new text selection)
    document.addEventListener('mousedown', function onMouseDown() {
      hidePopup();
      selectedText = '';  // Clear the selected text
    }, { once: true });
  } else {
    hidePopup();
  }
});
