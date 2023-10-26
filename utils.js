function verifyGoogleAPIKey(key, callback) {
  const query = 'test';
  const cx = '017127030588722237122:ttrznd5axgy' //search engine id frm https://programmablesearchengine.google.com/controlpanel/
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${key}&cx=${cx}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        callback(false, data.error.message);
      } else {
        callback(true);
      }
    })
    .catch(error => {
      callback(false, error.message);
    });
}

function verifyGptAPIKey(key, callback) {
  callback(true)
}

function showKeySavedMessage(elementId) {
  const element = document.getElementById(elementId);
  element.classList.remove('hidden');
  setTimeout(() => {
    element.classList.add('hidden');
  }, 5000);
}
