var today = getTodayKey();

chrome.storage.local.get(today, function (result) {
    todayData = result[today] || [];

    var todayvistits = document.getElementById("today-ticks");
    todayvistits.innerText = todayData.length;

    var sitelist = {};
    for (var i = 0; i < todayData.length; i++) {
        var h = getHost(todayData[i].url);
        if (sitelist[h])
            sitelist[h]++;
        else
            sitelist[h] = 1;
    }

    var sites = Object.keys(sitelist).sort(function (a, b) { return sitelist[b] - sitelist[a] });

    var slist = document.getElementById("site-list");
    slist.innerHTML = "";

    for (var i = 0; i < sites.length; i++) {
        slist.innerHTML += '<div><span class="hit">' + sitelist[sites[i]] + '</span><span class="site">' + sites[i] + '</span></div>';

        if (i > 5)
            break;
    }
});

var visual = document.getElementById("visualize");
visual.onclick = function() {
    chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
}