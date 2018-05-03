//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
      chrome.pageAction.show(sender.tab.id);
      sendResponse();
  });

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status === 'complete') {

        if (tab.url.indexOf('chrome://') > -1 || tab.url.indexOf('chrome-search://local-ntp/local-ntp.html') > -1
            || tab.url.indexOf('chrome-extension:') > -1 || tab.url.indexOf('view-source:') > -1)
            return;

        var usageInfo = { "url": tab.url, "time": getUTCNow() };       

        var today = getTodayKey();
        chrome.storage.local.get(today, function (result) {
            todayData = result[today] || [];
            todayData.push(usageInfo);

            console.log(todayData);

            var pushdata = {};
            pushdata[today] = todayData;

            // just push the data, no callback
            chrome.storage.local.set(pushdata);
        });
    }
});

function getTodayKey() {
    return new Date().toDateString("").replace(/ /g, "-");
    //return 'Wed-May-02-2018';
}

function getUTCNow() {
    return Math.floor((new Date()).getTime() / 1000);
}


//chrome.storage.local.clear(function () {
//    var error = chrome.runtime.lastError;
//    if (error) {
//        console.error(error);
//    }
//});