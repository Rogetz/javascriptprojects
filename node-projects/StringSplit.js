var mySentence ="I have a couple of words and a word another word too"

// the split function actually works to split at whatever instance you have told it to,
// for example in this case it will split wherever it meets a space.
var createdArray  = mySentence.split(" ")
console.log(mySentence.split(" "))
console.log(mySentence.split(" ")[1])


// there's a problem with this split function and I need to really evaluate it very well.
var wordToTest = "word"
createdArray.forEach((item,index) => {
    if(wordToTest == item){
        createdArray.splice(index,index+1,"hello there")
    }
})
var longString = "This is the collection of words and is"
var convertedArray = longString.split(" ")
convertedArray.forEach((word,index) => {
    if(word == "is"){
        //console.log(word)
        console.log(convertedArray.splice(index,index+1,"that"))// note that the start is the begining of the index, the end is the actual end +1 , cause its always exclusive of the number provided.
    }
})

console.log(createdArray.join(" "))
console.log("\n\n"+convertedArray.join(" "))