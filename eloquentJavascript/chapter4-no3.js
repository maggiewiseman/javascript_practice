/*writea function arrayToList that builds up a data structure like the previous one when given [1,2,3] as an argument, and wriata listToArray function that produces an array from a list.  Also write thehe lper functions, prepend, which takes an element and a list and creates a new list that add the element to hte fron the the input list, and nth, which takes a list and a number and rturns the element at the given position in the list or undefined when there is no such element. */



var arrayToList = function (array1) {
  'use strict';
  //create new list object
  var list = {};
  if(array1.length === 0) {
    return null;
  }
  //add property that is equal to first array value
  //remove first array value

  list.value = array1.shift();
  //take shortened array and add it to rest property of list object
  list.rest = arrayToList(array1);
  
  return list;
};

var demoArray = [3,4,5];
//console.log(arrayToList(demoArray));

var listToArray = function(list, array2) {
  'use strict';
  
  if (list !== null) {
    array2.push(list.value);
    console.log("array2[0] = " + array2[0]);
    listToArray(list.rest, array2);
  }  
};

//make a new empty array
var array1 = [];
listToArray(arrayToList(demoArray), array1);
console.log(array1);