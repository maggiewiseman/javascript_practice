function identityf(x){
	return x;
}

identityf(3);

function add(x,y){
	return x+y;
}

function mul(x,y){
	return x*y;
}

function idf(x){
	return function(){
		return x;
	}
}

idf(3);

function addf(x){
	return function(y) {
		return x + y;
	}
}

console.log(addf(3)(4));

