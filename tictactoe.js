//total number of turns
var numClicks = 1;


// these are the vars that will store the number of times a box in a certain column, row or diagonal 
// has been clicked. Once they get to a length of 3, that will tell us who won. 
function Player(color){
	this.color = color;
	this.column1 = 0;
	this.column2 = 0;
	this.column3 = 0;
	this.row1 = 0;
	this.row2 = 0;
	this.row3 = 0;
	this.diagonal159 = 0;
	this.diagonal357 = 0;
}

var firstplayer = new Player("Blue");
var secondplayer = new Player("Red");

//this is a funtion to increment column, row or diagonal values for the player object
//when a button is clicked.
function setColumnAndRow(btn, player) {
	// body...
	switch(btn){
		case '1':
		player.column1 += 1;
		player.row1 += 1;
		player.diagonal159 += 1;
		break;
		case '2':
		player.column2 += 1;
		player.row1 += 1;
		break;
		case '3':
		player.column3 += 1;
		player.row1 += 1;
		player.diagonal357 += 1;
		break;
		case '4':
		player.column1 += 1;
		player.row2 += 1;
		break;
		case '5':
		player.column2 += 1;
		player.row2 += 1;
		player.diagonal159 += 1;
		player.diagonal357 += 1;
		break;
		case '6':
		player.column3 += 1;
		player.row2 += 1;
		break;
		case '7':
		player.column1 += 1;
		player.row3 += 1;
		player.diagonal357 += 1;
		break;
		case '8':
		player.column2 += 1;
		player.row3 += 1;
		break;
		case '9':
		player.column3 += 1;
		player.row3 += 1;
		player.diagonal159 += 1;
		break;
		default:
		break; 



	}

}

function checkForWinner(player){
	console.log(" in function checkForWinner");
	for(var count in player) {
		if(player[count] === 3){
			console.log("in if count ===3 statement");
			alert(player.color + " wins!");
		};

	};
}

// this is the function that changes the color of the buttons and then does other logic
// to see who wins the game, but am not sure how to do that logic yet. 
function buttonClick(btn) {
	if (numClicks === 1) {
		alert("You are first player - you will be blue!");
	};

	//this part changes the color of the box and then calls the setColumnAndRow method to 
	// keep track of where each user has clicked. 
	// then it calls the check for winner method if there's been at least 5 turns.
	if (numClicks % 2 === 0) {
		document.getElementById(btn).style.backgroundColor = "red";
		numClicks++;

		setColumnAndRow(btn, secondplayer);
		if(numClicks > 4){
			console.log("in if numClicks for 2nd player");
			checkForWinner(secondplayer);	
		};
	} else {
	document.getElementById(btn).style.backgroundColor = "blue";
	numClicks++;
	
	setColumnAndRow(btn, firstplayer);
	if(numClicks > 4){
			console.log("in if numClicks for 1st player");		
			checkForWinner(firstplayer);	
		};
	};

	
}
