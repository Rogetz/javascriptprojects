// The shift ,method actually removes the first element of an array, and returns it.
// Therefore what is left is a new array

var originalAarray = [25,35,45]
console.log("Before shiftting")
console.log(originalAarray)
var shiftedArray = originalAarray.shift()
console.log("The shifted number of the array"+shiftedArray)
console.log("After shifting")
console.log(originalAarray)