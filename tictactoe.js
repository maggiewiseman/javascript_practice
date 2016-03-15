var numClicks = 1;
var blueBoxes = 0;
var redBoxes = 0;

/*function buttonClick(btn) {
	alert("You are first player - you will be blue!");
	if (count % 2 === 1) {
	document.getElementById(btn).style.backgroundColor = "blue";
	}
} */
// these are the arrays that will store the column and row information. I was thinking 
//that once they get to a length of 3, that will tell us who won. excpet it doesn't do diagonal! 
function Player(){
	column1 = [];
	column2 = [];
	column3 = [];
	row1 = [];
	row2 = [];
	row3 = [];
}

var firstplayer = new Player();
var secondplayer = new Player();

//this was a funtion to set values int he arrays of the player object when a button was clicked.
//but I don't think this is going to work....
function setColumnAndRow(btn) {
	// body...
	switch(btn){
		case: '1',




	}

}

// this is the function that changes the color of the buttons and then does other logic
// to see who wins the game, but am not sure how to do that logic yet. 
function buttonClick(btn) {
	if (numClicks === 1) {
		alert("You are first player - you will be blue!");
	};

	if (numClicks % 2 === 0) {
	document.getElementById(btn).style.backgroundColor = "red";
	numClicks++;
	redBoxes++;
	setColumnAndRow(btn);
	} else {
	document.getElementById(btn).style.backgroundColor = "blue";
	numClicks++;
	blueBoxes++;	
	};

	if(blueBoxes % 3 === 0){


	} else if (redBoxes % 3 === 0) {


	}
}
