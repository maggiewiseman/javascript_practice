//hash tag grid assignment
var userInput = prompt("How big is the grid?");

var size = userInput/2;
console.log("size = " + size);

	
	for(var i=0; i<size; i++) {
		var row1 = "";
		var row2 = ""
		
		for (var j = 1; j<size; j++) {
			row1 += "# ";
			row2 += " #";
		};

		console.log(row1);
		console.log(row2);
	};
