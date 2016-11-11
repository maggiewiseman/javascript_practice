
var range = function (start, end, step) {
  
  var array1 = [];
  var i = 0;
   while(start <= end){
     array1[i] = start; 
     start++;
     i++;
   }
  return array1;
};

console.log(range(2,5));

var sum = function(arrayp) { 
  console.log("array is:" + arrayp);
    var total = 0;
    for(var i = 0; i < arrayp.length; i++) {
       total = total + arrayp[i];
    }
  return total;

}


var total2 = sum(range(1, 8));

console.log(total2);

