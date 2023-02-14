
// Different Method to create Buffer
var buffer1 = Buffer.alloc(100);
var buffer2 = Buffer.alloc(200);
buffer2.write("saving their deprecated code");
var buffer3 = Buffer.from([1, 2, 3, 4]);

// Writing data to Buffer
buffer1.write("Happy Learning");

// Reading data from Buffer
var a = buffer1.toString('utf-8');
console.log(a);

// Check object is buffer or not
console.log(Buffer.isBuffer(buffer1));

// Check length of Buffer
console.log(buffer1.length);

// Copy buffer
var bufferSrc = Buffer.alloc(50);
bufferSrc.write("another deprecated new Buffer in use");
var bufferDest = Buffer.alloc(3);
bufferSrc.copy(bufferDest);

var Data = bufferDest.toString('utf-8');
console.log(Data);

// Slicing data
var bufferOld = Buffer.alloc(200);
bufferOld.write("They had a whole bunch of some deprecated content");
var bufferNew = bufferOld.slice(0, 4);
console.log(bufferNew.toString());

// concatenate two buffer
var myBuffer = Buffer.alloc(100);
var bufferOne = Buffer.alloc(500);
bufferOne.write("I am evenn modifying their buffer to see if it really works.");
myBuffer.write("I see am testing the new buffer that I have created with the alloc method since the original buffer has been deprecated");
var bufferTwo = Buffer.alloc(40);
bufferTwo.write("Trust me this is not their original buffer content");
var bufferThree = Buffer.concat([bufferOne, bufferTwo]);
console.log(bufferThree.toString());
console.log(myBuffer.toString());
console.log("\n Testing for the type of this array: \n"+Buffer.isBuffer(myBuffer)+"\n")



/*This is where I test some faults or advantages of the buffer type. */

console.log("Am now testing for the different cool features or defects of the buffer data type.");
var ArrayBufferWatcher = new Uint16Array(2);// testing for how it represents a 16 bit arrayBuffer.
// an arrayBuffer isn't a buffer yet.
ArrayBufferWatcher[0] = 7005;
ArrayBufferWatcher[1] = 5005;
console.log("----vthe int16array----")
console.log(ArrayBufferWatcher.join(","))

console.log("\n Testing for the type of this array: \n"+Buffer.isBuffer(ArrayBufferWatcher)+"\n")
// always remeber that an arrayBuffer is a memory area. and has no info on what is actually stored in it.
var actualNewestBufferr = ArrayBufferWatcher.buffer// this is an arrayBuffer referenced by the actual array and so it can't work well with the buffer methods
var bufferWatcher = new Uint16Array(actualNewestBufferr);

// This is the method to decode from another ArrayBufferWatcher like lets say a Uint16Array
console.log("Testing for whether I can actually decode the buffer by creating a new watcher from it"+bufferWatcher)

var myConvertedBuffer = Buffer.from(ArrayBufferWatcher)

// Testing with the json method. and of couse I'll use it maybe next time
Buffer.from(ArrayBufferWatcher).toJSON

// Testing with the toString method. Which didnt work
console.log("Bufer with the toSTRING METHOD"+myConvertedBuffer.toString())

// try looking for a way I can decode the buffer to actual value used before the buffer( used in the Buffer.from method)
// cause what I actually realized is that the join method and even the Array.prototype.slice.call can convert it easily to the required state.
console.log("\n testing for the join method of the buffer\n"+myConvertedBuffer.join(",")+"\n\n")
console.log("\n Testing for the type of this myConvertedBuffer : \n"+Buffer.isBuffer(myConvertedBuffer)+"\n")
console.log("\n\n my converted array using the buffer to array conversion method \n\n")
// This method below actually works but you have to pass the second parameter as an array
// however this method below doesn't work in actual conversion to the array that we'd want, it simply can't convert from a buffer to an array
console.log(Array.prototype.slice.call(myConvertedBuffer,[0,16]))

console.log("\n Testing for the type of this array: \n"+Buffer.isBuffer(actualNewestBufferr)+"\n")

// Wow seems like the buffer is converted to deciimal type during display to us. Though am yet to confirm this tommorrow.
// I dont understand why the buffer aint displaying yet am passing an encoding parameter of utf16
console.log(actualNewestBufferr);// note that the encodings work with the binary data directly and afterwards its when they can be converted to hexadeximal or decimal, octal or other data type
// do just know that each encoding works directly with the binary data or digits and that you can't directly jump from one encoding to another unless you do use the binary data first.

// this method below only works for the buffer type and not a specific memeory location like in this case, where its pointing to its buffer location
console.log(Array.prototype.slice.call(actualNewestBufferr,[0,10]))
// remember this below is an arrayBuffer being pointed to and not an actual buffer type.
console.log(actualNewestBufferr)

try{
    console.log(buffer.toString(actualNewestBufferr))
}
catch (error){
    console.log("An error while casting the buffer to string")
}
