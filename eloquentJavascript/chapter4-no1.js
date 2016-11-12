/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */ /*global define */

var range = function (start, end, step) {
    'use strict';
    var array1 = [],
      i = 0;
    if (start < end) {
      while (start <= end) {
        array1[i] = start;
        start = start + step;
        i++;
      }
    } else if (start > end) {
      while (start >= end) {
        array1[i] = start;
        start = start + step;
        i++;
      }
    }
    console.log("array:" + array1);
    return array1;
  };

console.log(range(2, 5));

var sum = function (arrayp) {
  'use strict';
  var total = 0;
  for (var i = 0; i < arrayp.length; i++) {
    total = total + arrayp[i];
  }
  return total;

};


var total2 = sum(range(5, 2, -1));

console.log(total2);

