/*Deep Comparision: Write a function, deepEqual, that takes two values and returns true only if they are the same value or are objects with the same properties whose values are also equal when compared with a recursive call to deepEqual */

var deepEqual = function (valueA, valueB) {
  //need to see if the values are null b/c null has a typeof object
  if(valueA === null || valueB === null) {
    console.log("one or more of your arguments are null");
    return false;
    //here I see if they are the same type and then I can check to see if they are objects
    //if objects call deepEqual on their properties. Otherwise check equality.
  } else if (typeof valueA === typeof valueB) {
    console.log( "your values are the same type of object");
    //only have to check if valueA or B are objects because I already checked that they are the same type.
      if (1 === 0) {
        
      //only have to check if valueA or B are objects because I already checked that they are the same type.
      } else if (typeof valueA == "object") {
        //if they are objects iterate through properties
        //need to check if they are arrays
        
        for(var prop in valueA) {
        //  if(typeof valueA.prop == "object" && valueB.prop == "object") {
            deepEqual(valueA.prop, valueB.prop);          
        }
      } else if (valueA === valueB) {
        return true;
      } else {
        //values are the same type but are not objects and not equal
        return false;
      }
    //if not the same object then can use the == for string and number comparision
  } else if (valueA == valueB) {  
    console.log("your values are equal");
    return true;
  } else {
    console.log("your values are not equal");
    return false;
  }
  
};

//test if either value is null
console.log("test 1: " + deepEqual(5,null)); //false
console.log("test 2: " + deepEqual(null, 5)); //false

//test if number = string
console.log("test 3: " + deepEqual("7", 7)); //true
console.log("test 4: " + deepEqual("7", 6)); //false

//test if two strings are equal
console.log("test 5: " + deepEqual("cat", "cat")); //true
console.log("test 6: " + deepEqual("cat", "rat")); //false

var arrayA = [1, 3, 5, 7, 9];
var arrayB = [1, 3, 5, 7, 9];

//console.log("test 7: " + deepEqual(arrayA, arrayB)); //true

var objectA = {
  name: "maggie",
  age: 39
};

var objectB = {
  name: "maggie",
  age: 39
};

var objectC = {
  name: "tom",
  age: 39,
  job: {
    title: "engineer",
    salary: 100000
  }
};

var objectD = {
  name: "tom",
  age: 39,
  job: {
    title: "engineer",
    salary: 100000
  }
};

var objectE = {
  name: "Kristin",
  age: 39,
  job: {
    title: "engineer",
    salary: 100000
  }
};

console.log(deepEqual(objectA, objectB)); //true
console.log(Object.prototype.toString.call( arrayA ));
