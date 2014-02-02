/*
This is the script which runs in an environment between a page
and the Chrome extension.
THey are laoded on every page load, and have full accesc to the page's
DOM.
 */

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	switch(message.type) {
		case "colors-div":
			var divs = document.querySelectorAll("div");
			if(divs.length === 0) {
				alert("There are no any divs in the page.");
			} else {
				for(var i=0; i<divs.length; i++) {
					divs[i].style.backgroundColor = message.color;
				}
			}
		break;
	}
});




//The code that is fired upon page load
//to check your plugin js is working uncomment the next line.

//$("#pop-up").html(id);  

/*
//////$(function() {
  var moveLeft = 20;
  var moveDown = 10;

  $('img').hover(function(e) {
  	$('img').after("<!-- HIDDEN / POP-UP DIV --><div id='pop-up' style='z-index: 9999999'><h3>Pop-up div Successfully Displayed</h3><p>This div only appears when the trigger link is hovered over. Otherwise it is hidden from view.</p></div>" );
    $('div#pop-up').show();
      //.css('top', e.pageY + moveDown)
      //.css('left', e.pageX + moveLeft)
      //.appendTo('body');
  }, function() {
    $('div#pop-up').hide();
  });

  $('img').mousemove(function(e) {
    $("div#pop-up").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
  });

//////});
*/

$('img').hover(function() {
	//var id = ($(this).attr('name'));
	console.log("HOVER");
	$('img').after("<!-- HIDDEN / POP-UP DIV --><div id='pop-up' style='z-index: 9999999'><h3>Pop-up div Successfully Displayed</h3><p>Appears when the img is hovered over. Otherwise it should be hidden.</p></div>" );

	$("#pop-up").dialog({
		//modal: true,
		autoOpen: false,
		//closeOnEscape: true,                            
		draggable: true,                                       
		height: 200,
		width:200,
		resizable: true,
		title: 'IMAGE HOVER',                                    
		zIndex: 999900000,
	  	position: { my: "left top", at: "left bottom" }
	});

	var dialog = $("#pop-up").dialog()
	dialog.dialog('open');
 }, function( ) {
 	var dialog = $("#pop-up").dialog()
 	console.log("CLOSE");
	dialog.dialog('destroy');
	//$("#pop-up").remove();
});