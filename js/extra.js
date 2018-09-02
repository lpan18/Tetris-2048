var n = 2;
var m = 3;

jQuery(document).ready(function($) {
    // Code here will be executed on document ready. Use $ as normal.
    //$("#green").fadeOut(1000);
    //$('#green').mouseenter(function() {
    //    $('#green').fadeTo('fast', 1);
    //})

	//var div1 = document.createElement('div');
	//var text1 = document.createTextNode('Text1');
	//div1.appendChild(text1);
	//$(".gameContainer").append(div1);

	//$(".entry-content").prepend("<p>I'm a paragrpah</p>");

	$(document).keydown(function(key) {
        switch(parseInt(key.which,10)) {
			// Left arrow key pressed
			case 37:
				m--;
				$("table tr:nth-child(" + n + ") td:nth-child(" + m + ")").css('background-color', '#008800');
				break;
			// Up Arrow Pressed
			case 38:
				// Put our code here
				n--
				$("table tr:nth-child(" + n + ") td:nth-child(" + m + ")").css('background-color', '#008800');
				break;
			// Right Arrow Pressed
			case 39:
				// Put our code here
				m++
				$("table tr:nth-child(" + n + ") td:nth-child(" + m + ")").css('background-color', '#008800');
				break;
			// Down Array Pressed
			case 40:
				// Put our code here
				n++
				$("table tr:nth-child(" + n + ") td:nth-child(" + m + ")").css('background-color', '#008800');
				break;
		}
	});

	$('.gameContainer').append("<div class = 'gameObj'>I'm a paragrpah 1</div>");

	var table1 = document.createElement('table');
	table1.id = 'Game2048';
	for(var i = 0; i < 4; i++){
		var row = document.createElement('tr');
		for(var j = 0; j < 4; j++){
			var cell = document.createElement('td');
			row.appendChild(cell);
		}
		table1.appendChild(row);
	}

	$('#SampleTable').css('border', '1px solid green');
	$("table tr:nth-child(" + n + ") td:nth-child(" + m + ")").css('background-color', '#008800');
	$("table tr:nth-child(" + n + ") td:nth-child(" + m + ")").text("1234");
	$('.gameContainer').append(table1);
});