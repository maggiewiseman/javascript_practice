function Lady(name, personality){
	this.name = name;
	this.personality = personality;
	this.romancePoints = 0;
	this.salary = 0;


}

/*var setCharacter = function(x){
	switch(x){
		case 'A':


	}

} */
//user chooses a character which entitles her to a certain amount of $ and attractiveness
var userChar = prompt("Which character would you like to be? \n\nA) Elizabeth Bennet\n B) Caroline Bingley\n C) Charlotte\n D) Anne\n E) Jane Bennett\n F) Lydia Bennett");

//user chooses a personality
var userPersonality = prompt("What is your personality: A) Snobby B) Quiet C) Witty D) Party animal E) Pragmatic F) Depressed ")


var lady1 = new Lady(userChar, userPersonality);
alert("You chose: " + lady1.name);