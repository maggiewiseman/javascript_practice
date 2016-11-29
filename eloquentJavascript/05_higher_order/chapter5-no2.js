

var ancestry = JSON.parse(ANCESTRY_FILE);

console.log(ancestry);


function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

/* Create an object to hold objects
this is kind of a map for the ancestry array 
where the property is the name and the value is the person object. */
var byName = {};
/*forEach element (which is a person object) in the ancestry array, put it in the byName object which where the property name is the person name. */
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

//goal is to compute average mother-child age difference
var ageArray = [];
//loop through ancestry array
ancestry.forEach(function(child) {
  var childBorn, 
      momBorn, 
      mothersName,
      age;
  
  childBorn = child.born;
  mom = child.mother;
  if(byName[mom]) {
    age = childBorn - byName[mom].born;
    ageArray.push(age);
    console.log(ageArray);
  }
});

console.log(average(ageArray));


//console.log(ancestry[0].born);
//console.log(byName["Emile Haverbeke"].born);

// → 31.2