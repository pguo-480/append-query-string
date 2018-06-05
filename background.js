chrome.extension.onRequest.addListener(function(request, sender) {
  chrome.tabs.update({ url: request.redirect });
});
