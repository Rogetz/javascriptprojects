// reduce is more suitable than a forEach loop if its about returning one total from the arrays, else the forEach loop is more superior.

var arrTest = [25,30,58,75,98,100]
// ensure you don't pass the square brackets inside the call back function, it returns undefined instaed since in that case you'd need to explicitly define a return type and it must be one.
// Anyways is you place it in this style it works pretty fine.
var total = arrTest.reduce((accumulator, currentValue) => 
    accumulator + currentValue,0 // Take note that the 0 here refers to the initial value that this reduce function that should be added from like lets say if the initial value is 5 then its to begin its calculations with the value 5 as the first value.
)
console.log(total)
var total2 = arrTest.reduce((accumulator, currentValue) => 
accumulator + currentValue,100 // Take note that the 0 here refers to the initial value that this reduce function that should be added from like lets say if the initial value is 5 then its to begin its calculations with the value 5 as the first value.
)
console.log(total2)