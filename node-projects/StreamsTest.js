// try my other projects with the read stream.
// remember its all the same but a read stream would be more time saving in the case of a larger project.

// And by the way I've gotten an idea for my previous project. I could probably make it in such a way that it reads each single item(here I can still use the space split in the file updater since it would be faster than the initial no space split in the configUpdater first project.) and compares it with the first letter of a word.

// NB: A stream only eneables you to interact with the stream as it is reading a file.
// however the interaction is limited to read only, in that you can intercat with the tiny chuncks, using the event listeners the common ones being, the data and the end event.
// that it sends from time to time and that you dont have to wait for it to finish reading the whole file.
// here am  refering to the readStream, note that the writeStream does the exact opposite of writing in little chunks bit by bit.
// NOte that the readStream and the writeStream can work together inorder to create a piping like system.
// Like for example you could get the data chunk by chunk  then as well write them chunk by chunk as you wish

// So if the first letter is the same you could then continue to the other letters each time comparing with the other letters of the original word that am loking for, if at any point in time, they aint the same, then it stops at that and skips over to other parts of the word.
var path = require("path")
var fs = require("fs")
var myStreamHandler = require(path.join(__dirname,"StreamHandler.js"))// worked pretty well, remeber to always include the absolute path.

// a readStream with the option's dictionary
// the options work pretty well just remeber though that, if another readStream is open, then
// this one with the flags tends to misbehave by not begining at the required index that its meant to.
// However do understand that this one up here works very well.
fs.createReadStream(path.join(__dirname,"test.txt"),{
    flag : 'r',
    encoding : 'UTF-8',
    start : 0,
    end : 25,//remeber that this is in bytes and so count each character in this case as one byte, inclusive of the spaces in the character.
    highWaterMark : 64// remeber that this is in kib, so its like the maximum amount of data that this readStream can handle.s
    // nut do remember that in some time to come you'll have to expand it for the sake of larger files that might require watermarks in giga bytes.
}).pipe(process.stdout)// confirm what are the parameters for the pipe function.

// btw the imported function works pretty much very well.
console.log("\ntesting the log function with my own created function\n"+myStreamHandler.testFunction("It is what it is"))// worked very well

// try creating a method that can work with a specific line of text
fs.createReadStream(path.join(__dirname,"test.txt")).pipe(process.stdout)// here note that the process stdout will be the console since its the one that I'll be using here. Process is actually very sweeter than I actually thought.

// a readStream with the option's dictionary
// the options work pretty well just remeber though that, if another readStream is open, then
// this onw with the flags tends to misbehave by not begining at the required index that its meant to.
fs.createReadStream(path.join(__dirname,"test.txt"),{
    flag : 'r',
    encoding : 'UTF-8',
    start : 0,
    end : 25,
    highWaterMark : 16
}).pipe(process.stdout)

// here I'll be testing a callback directly inside the createaReadStream and not outside like before.
// I actually tried this but it did not work as expected, no error was emmited though.
try {
    fs.createReadStream(path.join(__dirname,"test.txt"),function(){
        console.log("\n\nsuccessfully read\n\n")
    })    
} catch (error) {
    console.log("\n\na call back in the readStream seems impossible\n\n")
}


fs.createReadStream(path.join(__dirname,"test.txt")).addListener("data",function(data){
    console.log("\n\nThe data from the eventListener")
    console.log(data.toString())
})

console.log("obviously they seem to not exist because am offline")
console.log(fs.existsSync("http://www.safaricom.com"))
console.log(fs.existsSync("http://www.youtube.com"))
console.log(fs.existsSync("http://www.facebook.com"))
console.log(fs.existsSync("http://www.google.com"))
console.log(fs.existsSync("http://www.betika.com"))