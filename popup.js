const paramNum = 5;

function openPageWithQueryParams() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        currentURL = tabs[0].url;
        let url = new URL(currentURL);

        chrome.storage.local.get(null, function(result) {
            for (var key in result) {
                var value = result[key];
                url.searchParams.set(key, value);
            }

            chrome.extension.sendRequest({ redirect: url.href }); // send message to redirect
        });
    });
}

function saveQueryString(id) {
    let keyID = "key" + id;
    let valueID = "value" + id;

    key = document.getElementById(keyID).value;
    value = document.getElementById(valueID).value;

    addQueryString(key, value);
}

function removeSavedQueryString(id) {
    let keyID = "key" + id;
    let valueID = "value" + id;
    key = document.getElementById(keyID).value;
    deleteQueryString(key);
    document.getElementById(keyID).value = "";
    document.getElementById(valueID).value = "";
}

function addQueryString(key, value) {
    chrome.storage.local.set({ [key]: value }, function() {
        console.log("Value for key " + key + " is set to " + value);
    });
}

function deleteQueryString(key) {
    chrome.storage.local.remove(key, function(result) {
        console.log("key " + key + " is removed");
    });
}

function clearAllQueryString() {
    chrome.storage.local.clear(function(result) {
        console.log("Cleared all params");
    });
}

function getQueryStrings() {
    chrome.storage.local.get(null, function(result) {
        console.log(result);
        console.log("Value currently is " + result.key);
    });
}

document
    .getElementById("openPage")
    .addEventListener("click", openPageWithQueryParams);

document
    .getElementById("clearAll")
    .addEventListener("click", clearAllQueryString);

for (let i = 1; i < paramNum + 1; i++) {
    document.getElementById("save" + i).addEventListener("click", function() {
        console.log("save" + i);
        saveQueryString(i);
    });
    document.getElementById("delete" + i).addEventListener("click", function() {
        console.log("delete" + i);
        removeSavedQueryString(i);
    });
}

chrome.storage.local.get(null, function(result) {
    let i = 1;
    for (var key in result) {
        var value = result[key];

        let keyID = "key" + i;
        let valueID = "value" + i;

        document.getElementById(keyID).value = key;
        document.getElementById(valueID).value = value;
        i++;
    }
});
