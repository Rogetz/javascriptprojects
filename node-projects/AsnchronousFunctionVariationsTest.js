// Take keen note that every function in javascript is asynchronous.

//declaring a function with a callback
function testFunction1(wordOfTheDay,callbackFunc){
    callbackFunc(wordOfTheDay)    
}

//declaring a normal function without a callback
function testFunction2(wordOfTheDay){
    return wordOfTheDay
}


console.time()
// Calling the function with a callback
testFunction1("mchezo",function(data){
    console.log("Begining execution of the function with a call back function")
    for(i = 0; i <= 5; i++){
        console.log(data)
    }
})
console.timeEnd()


console.time()
//declaring an async function with an awaited function inside it.
async function myAsyncFunction(){
    console.log("The async function has just started execution")
    await testFunction1("tabaka",function(result){
        for(i = 0; i <= 5; i++){
            console.log(result)
        }
    })
}
myAsyncFunction()// note that you can only await a function with an async keywords
console.timeEnd()

console.time()
// creating a normal I/O blocking operation. Note this is for comparison with the function with a callback, not the one with an async
let data = testFunction2("mchezo2")
console.log("Begining execution of the normal i/O blocking function")
for(i = 0; i <= 5; i++){
    console.log(data)
}

console.timeEnd()