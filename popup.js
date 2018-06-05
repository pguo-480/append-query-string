

function openPageWithQueryParams() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
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
    let keyID = "key" + id
    let valueID = "value" + id
    
    key = document.getElementById(keyID).value;
    value = document.getElementById(valueID).value;

    addQueryString(key, value)

}

function removeSavedQueryString(id){
    let keyID = "key" + id
    let valueID = "value" + id;
    key = document.getElementById(keyID).value;
    deleteQueryString(key)
    document.getElementById(keyID).value = ""
    document.getElementById(valueID).value = "";
}

function addQueryString(key, value) {
    chrome.storage.local.set({ [key]: value }, function () {
        console.log("Value for key " + key + " is set to " + value);
    });
}

function deleteQueryString(key) {
    chrome.storage.local.remove(key, function (result) {
        console.log("key " + key + " is removed");
    });
}

function clearAllQueryString() {
    chrome.storage.local.clear(function (result) {
        console.log("Cleared all params");
    });
}

function getQueryStrings() {

    chrome.storage.local.get(null, function (result) {
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

document.getElementById("save1").addEventListener("click", function () {
    saveQueryString(1);
});

document.getElementById("save2").addEventListener("click", function() {
  saveQueryString(2);
});

document.getElementById("save3").addEventListener("click", function() {
  saveQueryString(3);
});

document.getElementById("delete1").addEventListener("click", function() {
    removeSavedQueryString(1);
});

document.getElementById("delete2").addEventListener("click", function () {
    removeSavedQueryString(2);
});

document.getElementById("delete3").addEventListener("click", function () {
    removeSavedQueryString(2);
});


chrome.storage.local.get(null, function (result) {
    let i = 1;
    for (var key in result) {
        var value = result[key];

        let keyID = "key" + i;
        let valueID = "value" + i;

        document.getElementById(keyID).value = key;
        document.getElementById(valueID).value = value;
        i++
    }
});
