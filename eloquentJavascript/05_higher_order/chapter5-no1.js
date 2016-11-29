var arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
console.log("arrays: " + arrays[0]);
var arrB = arrays.reduce(function(a,b){
  return a.concat(b);
})

console.log(arrB[0]);
// → [1, 2, 3, 4, 5, 6]