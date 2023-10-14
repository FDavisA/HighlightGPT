let popup = null;
let selectedText = '';

// Function to show the popup
function showPopup(event, text) {
  if (!popup) {
    popup = document.createElement('div');
    popup.className = 'highlight-popup';
    document.body.appendChild(popup);
  }
  popup.textContent = text;
  popup.style.left = `${event.clientX}px`;
  popup.style.top = `${event.clientY}px`;
  popup.style.display = 'block';
}

// Function to hide the popup
function hidePopup() {
  if (popup) {
    popup.style.display = 'none';
  }
}

// onMouseOver function
function onMouseOver(e) {
  const range = window.getSelection().getRangeAt(0);
  const rect = range.getBoundingClientRect();
  if (selectedText.length > 0 && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
    showPopup(e, selectedText);
  } else {
    hidePopup();
  }
}

document.addEventListener('mouseup', function(event) {
  selectedText = window.getSelection().toString().trim();

  if (selectedText.length > 0) {
    // Attach mouseover event to the document
    document.addEventListener('mouseover', onMouseOver);

    // Remove the event listeners when mouse is down (to allow new text selection)
    document.addEventListener('mousedown', function onMouseDown() {
      document.removeEventListener('mouseover', onMouseOver);
      hidePopup();
      selectedText = '';  // Clear the selected text
    }, { once: true });
  }
});
