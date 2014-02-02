window.onload = function() {
	document.getElementById("button").onclick = function() {
		console.log("Button clicked!");
		chrome.extension.sendMessage({
	        type: "color-divs"
	    });
	}
}