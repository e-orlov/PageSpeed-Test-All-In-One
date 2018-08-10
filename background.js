chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(tab.id, {file: "bookmarklet.js"})
});

chrome.browserAction.onClicked.addListener(tab => {
  if (!tab.url) return;
  chrome.storage.sync.get('savedApi', ({savedApi}) => {
    chrome.tabs.create({
      url: `https://www.webpagetest.org/runtest.php?url=${encodeURIComponent(tab.url)}&k=${savedApi}`,
      index: tab.index + 1,
      openerTabId: tab.id,
    });
  });
});

chrome.runtime.onInstalled.addListener(function (object) {
    if (chrome.runtime.OnInstalledReason.INSTALL === object.reason) {
        chrome.tabs.create({url:chrome.extension.getURL("welcome.html")}, function (tab) {
            console.log("New tab launched with instructions to use the extension");
        });
    }
});