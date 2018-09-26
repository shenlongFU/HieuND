'use strict'

function sort(input) {
  for (var i = 0; i < input.length; i++) {
    
    for (var j = 0; j < input.length - 1; j++) {
        // Swap adjacent elements if they are in decreasing order
        if (input[j] > input[j + 1]) {
            var temp=input[j]
            input[j]=input[j+1]
            input[j+1]=temp
        }
    }
    
  }
  return input; // Remove this line and change to your own algorithm
}

module.exports = sort
