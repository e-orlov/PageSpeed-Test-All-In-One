function save_options() {
  var api = document.getElementById('wptk').value;
    chrome.storage.sync.set({
    savedApi: api,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Success! WebPageTest API key saved!';
    setTimeout(function() {
      status.textContent = '';
    }, 15000);
  });
}

document.getElementById('save').addEventListener('click', save_options);

function restore_options() {  
    chrome.storage.sync.get({"savedApi": ''}, function(items) {
      document.getElementById('wptk').value = items.savedApi;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);