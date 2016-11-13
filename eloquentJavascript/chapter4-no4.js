/*Deep Comparision: Write a function, deepEqual, that takes two values and returns true only if they are the same value or are objects with the same properties whose values are also equal when compared with a recursive call to deepEqual */

var deepEqual = function (valueA, valueB) {
  console.log("values received: A: " + valueA + " B: " + valueB);

  //need to see if the values are null b/c null has a typeof object
  if(valueA === null || valueB === null) {
    console.log("one or more of your arguments are null");
    return false;
    //here I see if they are the same type and then I can check to see if they are objects
    //if objects call deepEqual on their properties. Otherwise check equality.
  } else if (typeof valueA === typeof valueB) {
    console.log( "your values are the same type of object which is: " + typeof valueA);
      //need to check if we have arrays 
      // get more specific type to check for object Array
      var isAarray = Object.prototype.toString.call(valueA);
      var isBarray =Object.prototype.toString.call(valueB);
      if (isAarray == isBarray && isBarray == "[object Array]") {
         console.log("you have two arrays.");
        if(valueA.length == valueB.length) {
          for(var i = 0; i < valueA.length; i++) {
            if (!deepEqual(valueA[i], valueB[i])) {
                return false;
            } 
          } 
          return true;
        } else {
          //one array is longer than the other so not equal
          console.log("your arrays are not the same size");
          return false;
        }
         
      //only have to check if valueA or B are objects because I already checked that they are the same type.
      } else if (typeof valueA == "object") {

        //if both are objects, need to check if they are equal in size
        if (Object.keys(valueA).length == Object.keys(valueB).length) {
           //if they are objects equal in size, iterate through properties
           for(var prop in valueA) {
            console.log("valueA.prop:" + valueA[prop]);
            return deepEqual(valueA[prop], valueB[prop]);    
          }
        } else {
          //not the same size objects so not equal
          return false;
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
//console.log("test 1: " + deepEqual(5,null)); //false
//console.log("test 2: " + deepEqual(null, 5)); //false

//test if number = string
//console.log("test 3: " + deepEqual("7", 7)); //true
//console.log("test 4: " + deepEqual("7", 6)); //false

//test if two strings are equal
//console.log("test 5: " + deepEqual("cat", "cat")); //true
//console.log("test 6: " + deepEqual("cat", "rat")); //false

var arrayA = [1, 3, 5, 7, 9];
var arrayB = [1, 3, 5, 7, 9];
var arrayC = [1, 3, 5, 7, 29];
var arrayD = [21, 3, 5, 7, 9];
var arrayE = [1, 3, 5, 7, 9, 10];

console.log("test 7a: " + deepEqual(arrayA, arrayB)); //true
console.log("test 7b: " + deepEqual(arrayA, arrayC)); //false
console.log("test 7c: " + deepEqual(arrayA, arrayD)); //false
console.log("test 7d: " + deepEqual(arrayA, arrayE)); //false

var objectA = {
  name: "maggie",
  age: 39
};

var objectB = {
  name: "maggie",
  age: 39
};

var objectC = {
  name: "maggie",
  age: 39,
  job: {
    title: "teacher",
    salary: 90000
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
  name: "tom",
  age: 39,
  job: {
    title: "engineer",
    salary: 100000
  }
};

var objectF = {
  name: "tom",
  age: 39,
  job: {
    title: "engineer",
    salary: 120000
  }
};


//console.log("test 7: " + deepEqual(objectA, objectB)); //true
//console.log("test 8: " + deepEqual(objectA, objectC)); //false
//console.log("test 9: " + deepEqual(objectA, objectD)); //false
//console.log("test 10: " + deepEqual(objectA, "objectA")); //false
//console.log("test 11: " + deepEqual(objectA, 10)); //false




//console.log(Object.prototype.toString.call( arrayA ));
