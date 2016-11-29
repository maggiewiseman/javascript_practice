//compute and output the average age fo the people in the ancestry data set per century. A person is assigned to a century by taking their year of death, dividing it by 100 and rounding it up as in Math.ceil(person.died)/100

var ancestry = JSON.parse(ANCESTRY_FILE);

function average(array) {
  function plus(a, b) { return a + b;}
  return array.reduce(plus)/array.length;
}

function age(p) {
  return p.died - p.born;
}

function century(p) {
  return Math.ceil(p.died/100);
}

//filter an array to only except objects that are in a certain century
var sixteenth = ancestry.filter(function(person){ 
  return century(person) == 16;
});


//console.log("16: " + average(sixteenth.map(age)));


/* extra credit */
function groupBy(arr, group) {
  var groups = {};
  //forEach element in the array
  //var elementGroup = get the group by calling century function on the person
  //see if that group is already in groups object, if not, add it to groups object
  arr.forEach(function(element){
  var elementGroup = group(element);
    //console.log(elementGroup);
    if (elementGroup in groups) {
      groups[elementGroup].push(element);
    }else {
      groups[elementGroup] = [element]; 
    }
  });

  return groups;
}

var centuriesMap = groupBy(ancestry,century);
for(var century in centuriesMap){
    console.log(century + ': ' + average(centuriesMap[century].map(age)));
}

//First method which was just to get average age, not by century
//var ageArray = [];
//ancestry.forEach(function(person){
//  //find year age at death, assign to a century
//  var ageAtDeath = age(person);
//  ageArray.push(ageAtDeath);
//});
//
//console.log(average(ageArray));