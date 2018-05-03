function getTodayKey() {
    return new Date().toDateString("").replace(/ /g, "-");
    //return 'Wed-May-02-2018';
}

function getHost(href) {

    try {
        var l = document.createElement("a");
        l.href = href;
        return l.hostname;
    } catch (e) {

    }

    return 'Not Available';
}