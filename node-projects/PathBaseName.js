var path = require("path")
var mime = require("mime")
var fs = require("fs")

var pathBaseName = path.basename(path.join(__dirname,"BufferTest"))// simply returns the last name in the strokes
console.log(pathBaseName)// take keen note that the path base name doesn't add any extension to an already created file.
// lets see if the mime would detect the type.
//console.log(mime.lookup(pathBaseName))
// confirm if the fs module can detect the existence of a file without an extension.
// you see it can't actually detect the existence of a file without the files
console.log(fs.existsSync(path.join(__dirname,"BufferTest")))
