var today = getTodayKey();

chrome.storage.local.get(today, function (result) {
    todayData = result[today] || [];

    var sitelist = {};
    for (var i = 0; i < todayData.length; i++) {
        var h = getHost(todayData[i].url);
        if (sitelist[h])
            sitelist[h]++;
        else
            sitelist[h] = 1;
    }

    var sites = Object.keys(sitelist).sort(function (a, b) { return sitelist[b] - sitelist[a] });

    var siteCount = [];

    for (var i = 0; i < sites.length; i++) {
        siteCount.push(sitelist[sites[i]]);
    }

    var chartData = {
        labels: sites,
        datasets: [{
            label: 'Site usage',
            backgroundColor: "rgb(33, 150, 243)",
            borderWidth: 1,
            data: siteCount
        }]

    };

    function loadChart() {
        var ctx = document.getElementById('canvas').getContext('2d');
        window.myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            data: chartData,
            options: {
                elements: {
                    rectangle: {
                        borderWidth: 2,
                    }
                },
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,
                    text: 'What am I doing?'
                }
            }
        });

    };

    loadChart();

    var visual = document.getElementById("reset-stat");
    visual.onclick = function () {
        chrome.storage.local.clear(function () {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
                return;
            }

            chrome.tabs.reload();
        });
    }
});