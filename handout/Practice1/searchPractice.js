'use strict'

function search(input, target) {
  var a=-1
  for(var i=0;i<input.length;i++){
   if (input[i]==target) { a = i;break;}
   
  }
  return  a;  // Remove this line and change to your own algorithm
}

module.exports = search
