/*write a function arrayToList that builds up a data structure like the previous one when given [1,2,3] as an argument, and wriata listToArray function that produces an array from a list.  Also write the helper functions, prepend, which takes an element and a list and creates a new list that adds the element to the front of the the input list, and nth, which takes a list and a number and returns the element at the given position in the list or undefined when there is no such element. */


//takes an array and returns a link list
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


//takes a link list and returns an array
var listToArray = function(list, array2) {
  'use strict';
  
  if (list !== null) {
    //add value of object to end of array.
    array2.push(list.value);
    //console.log("array2[0] = " + array2[0]);
    
    //Take rest property of list object and call ListToArray to get its value to add to end of array
    listToArray(list.rest, array2);
  }  
  
};

//adds an item to front of a link list and returns the new list
var prepend = function (element, list) {
  'use strict';
  var item = {
    value: element,
    rest: list
  };
  
  return item;
};

//finds the nth item in a linked list and returns it
var nth = function (list, number) {
  'use strict';
  if(list !== null) {
    if(number <= 0) {
      return list.value;
    } else {
      return nth(list.rest, number-1);
    }
  }
};

var demoArray = [3,4,5];
//console.log(arrayToList(demoArray));

//make a new empty array for listToArray function to use
var array1 = [];
listToArray(arrayToList(demoArray), array1);
console.log(array1);

//make new array and list object for prepend practice
var demoArray2 = [5, 6, 7],
    testList = arrayToList(demoArray2);
console.log("test list: " + testList);
testList = prepend(2, testList);
console.log(testList);

console.log(nth(testList, 9));