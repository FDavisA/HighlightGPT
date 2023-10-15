document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('toggleButton');

  // Load the current state from storage
  chrome.storage.sync.get('extensionEnabled', function(data) {
    button.checked = data.extensionEnabled;
  });

  // Toggle the extension state when the button is clicked
  button.addEventListener('change', function() {
    const newState = button.checked;
    chrome.storage.sync.set({ 'extensionEnabled': newState }, function() {
      // Send a message to content scripts to update the state
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {extensionEnabled: newState});
      });
    });
  });
  // Get radio buttons
  const radios = document.getElementsByName('source');

  // Load the current choice from storage
  chrome.storage.sync.get('sourceChoice', function(data) {
    const choice = data.sourceChoice || 'text';  // Default to 'google'
    const selectedRadio = Array.from(radios).find(radio => radio.value === choice);
    if (selectedRadio) {
      selectedRadio.checked = true;
    }
  });

  // Save the choice when a radio button is selected
  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      chrome.storage.sync.set({ 'sourceChoice': this.value });
    });
  });
});
