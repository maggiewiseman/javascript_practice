/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */

//Take in an array and make a function that reverse that array into a new array

var reverseArray = function (array1) {
        'use strict';
  var array2 = [];
  var numItems = array1.length;
  for (var i=0; i < numItems; i++) {
    console.log("array1 is: " + array1);
    array2[i] = array1.pop();
  }
  console.log(array2);
  return array2;
};

var demoArray = [1,2,3, 4, 5, 6, 7];

//reverseArray(demoArray);

//Take in an array and reverse it in the same array

var reverseArrayInPlace = function (array1){
  'use strict';
  var numItems = array1.length;
  
  console.log("length: " + numItems);
 
  for (var i=0; i < numItems; i++) {
    //get the ith item and move it to the front of the array, starting from 0
    //this should give us an array that is twice as long.
    //i gets incremented by i to account for the additional items added to the array each time
    array1.unshift(array1[i+i]);
  }
  
  console.log(array1);
  
// remove initial items in array by slicing out the part we want from the new start to the same number of items as original array
  array1 = array1.slice(0, numItems);
  
  console.log(array1);
  
  return array1;
};

reverseArrayInPlace(demoArray);