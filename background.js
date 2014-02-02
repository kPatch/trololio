///////////////////
///Every extension has an invisible background page which is run by the browser
///There are two types:
///		Persistent background pages
///		Event pages
///Google encourages developers to use event pages, because it
///saves memory and increases performance
///
///This is where all the main logic and initialization should go.
///The background page/script plays bridges between the other
///parts of the extension.
///////////////////


// omnibox
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
	suggest([
	  {content: "color-divs", description: "Paint everything red"}
	]);
});
chrome.omnibox.onInputEntered.addListener(function(text) {
	if(text == "color-divs") colorDivs();
});

// listening for an event / one-time requests
// coming from the popup
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "color-divs":
            colorDivs();
        break;
    }
    return true;
});

// listening for an event / long-lived connections
// coming from devtools
chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
       	switch(port.name) {
			case "color-divs-port":
				colorDivs();
			break;
		}
    });
});

// send a message to the content script
var colorDivs = function() {
	chrome.tabs.getSelected(null, function(tab){
	    chrome.tabs.sendMessage(tab.id, {type: "colors-div", color: "#F00"});
	    // setting a badge
		chrome.browserAction.setBadgeText({text: "red!"});
	});
}