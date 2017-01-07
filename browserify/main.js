var requireFunction = require('./anotherJSfile.js');

var copyCat = function() {
	console.log("This is a copy cat function");
	document.write("Copy Cat Function" + requireFunction(5));
}

copyCat();