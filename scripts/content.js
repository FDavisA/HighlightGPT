document.addEventListener('mouseup', function(event) {
  const selectedText = window.getSelection().toString().trim();
  console.log("active")
  console.log(selectedText)
  if (selectedText.length > 0) {
    // Create a popup div
    const popup = document.createElement('div');
    popup.className = 'highlight-popup';
    popup.textContent = selectedText;
    
    // Position the popup
    popup.style.left = `${event.clientX}px`;
    popup.style.top = `${event.clientY}px`;
    
    // Append to document and show
    document.body.appendChild(popup);
    
    // Remove the popup when mouse is moved
    document.addEventListener('mousemove', function removePopup() {
      popup.remove();
      document.removeEventListener('mousemove', removePopup);
    });
  }
});
