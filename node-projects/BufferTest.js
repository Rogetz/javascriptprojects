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


/*This is where I test some faults or advantages of the buffer type. */

console.log("Am now testing for the different cool features or defects of the buffer data type.");
var newestArrayBuffer = new Uint16Array(2);// testing for how it represents a 16 bit arrayBuffer.
// an arrayBuffer isn't a buffer yet.
newestArrayBuffer[0] = 7000;
newestArrayBuffer[1] = 5000;

var actualNewestBufferr = newestArrayBuffer.buffer;
// Wow seems like the buffer is converted to deciimal type during display to us. Though am yet to confirm this tommorrow.
console.log(actualNewestBufferr.toString("UTF-16"));

