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

  const mainPage = document.getElementById('mainPage');
  const settingsPage = document.getElementById('settingsPage');
  const settingsButton = document.getElementById('settingsButton');
  const backButton = document.getElementById('backButton');
  const googleKeyInput = document.getElementById('googleKey');
  const gptKeyInput = document.getElementById('gptKey');
  const googleRadio = document.getElementById('google');
  const gptRadio = document.getElementById('gpt');

  // Load API keys from storage
  chrome.storage.sync.get(['googleKey', 'gptKey'], function(data) {
    googleKeyInput.value = data.googleKey || '';
    gptKeyInput.value = data.gptKey || '';
    googleRadio.disabled = !data.googleKey;
    gptRadio.disabled = !data.gptKey;
  });

  // Navigate to settings page
  settingsButton.addEventListener('click', function() {
    mainPage.classList.add('hidden');
    settingsPage.classList.remove('hidden');
  });

  // Navigate back to main page
  backButton.addEventListener('click', function() {
    mainPage.classList.remove('hidden');
    settingsPage.classList.add('hidden');
  });

  const saveGoogleKeyButton = document.getElementById('saveGoogleKey');
  const saveGptKeyButton = document.getElementById('saveGptKey');

  // Save Google API key when the checkmark button is clicked
  saveGoogleKeyButton.addEventListener('click', function() {
    const googleKey = googleKeyInput.value;
    chrome.storage.sync.set({ 'googleKey': googleKey }, function() {
      googleRadio.disabled = !googleKey;
    });
  });

  // Save GPT API key when the checkmark button is clicked
  saveGptKeyButton.addEventListener('click', function() {
    const gptKey = gptKeyInput.value;
    chrome.storage.sync.set({ 'gptKey': gptKey }, function() {
      gptRadio.disabled = !gptKey;
    });
  });
});
