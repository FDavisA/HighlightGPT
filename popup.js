document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('toggleButton');

  // Load the current state from storage
  chrome.storage.sync.get('extensionEnabled', function(data) {
    button.textContent = data.extensionEnabled ? 'Turn Off' : 'Turn On';
  });

  // Toggle the extension state when the button is clicked
  button.addEventListener('click', function() {
    chrome.storage.sync.get('extensionEnabled', function(data) {
      const newState = !data.extensionEnabled;
      chrome.storage.sync.set({ 'extensionEnabled': newState }, function() {
        button.textContent = newState ? 'Turn Off' : 'Turn On';
        // Send a message to content scripts to update the state
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {extensionEnabled: newState});
        });
      });
    });
  });
});
