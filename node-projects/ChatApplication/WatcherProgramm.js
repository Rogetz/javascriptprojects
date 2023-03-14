var fs = require("fs"); // for reading and writing files/directories, as well as watching files.
var path = require("path") // for generating some valid paths
var mime = require("mime") // for the mime module.

/*
exports.starter = function start(watchFile,response){
    fs.watchFile(watchFile,function(currentFile,previousFile){
        console.log("entered the start method and the path variable is"+watchFile+"and response is present")
        fs.readFile(watchFile,function(error,data){
            // The string array of the files available.
            if(error){
                console.log("An error occured my guys.")
            }
            else if (data){
                console.log("returned some data")
                response.writeHead(200,{"Content-Type" : mime.lookup(path.basename(watchFile))})
                response.end(data)
            }
        });
    })
}*/

// always use Camel casing for constructor classes.
module.exports = Watcher; // always use module.exports if you are only importing a class so that you don't need a dot notation to access the class when exported.
// in factt I've come to love module.exports.

// always use Camel casing for constructor classes.
function Watcher(watchFile,response){
    console.log("watchFile received"+watchFile)
    this.watchFile = watchFile;
    this.response = response;
}
// The watcher constructor works well, however I have a problem with the watchFile, its not reading the string value of a watchFile
// learn how i can properly read  the values of the watchFile parameter as the string it was passed.
Watcher.prototype.start = function(){
    console.log("testing the type of the this keyword"+typeof(this))
    console.log("the filePath is "+this.watchFile)
    let actualWatchFile = this.watchFile;
    let actualResponse = this.response;

    fs.watch(actualWatchFile,function(event,file){
        console.log("entered the new watch function")
    })
    //note that this is a keyword and not a variable so you if you refer to anything using this since it refers to the caller object.
    fs.watchFile(actualWatchFile,function(currentFile,previousFile){
        // note that you can't refer to the this object in the parent 
        console.log("entered the start method and the path variable is"+actualWatchFile+"and response is"+actualResponse)
        fs.readFile(actualWatchFile,function(error,data){
            // The string array of the files available.
            if(error){
                console.log("An error occured my guys.")
            }
            else if (data){
                console.log("returned some data")
                actualResponse.writeHead(200,{"Content-Type" : mime.lookup(path.basename(fileWatched))})
                actualResponse.end(data)
            }
        });
    })
    console.log("the fs.watchFile has been passed")
}
// note that the Watcher can even watch a whole directory, but here I have decided to only look out
// for the file
// example of reading a directory which returns an array of files.

/* commeneted out this other function of a class since it was causing some errors.
I'll research more on it however.*/
Watcher.prototype.fileReader = function(){
    console.log("entered the file reader")
    let actualWatchFile = this.watchFile
    let actualResponse = this.response
    fs.readFile(actualWatchFile,function(error,data){
        // The string array of the files available.
        if(error){
            console.log("An error occured my guys.")
        }
        else if (data){
            console.log("returned some data")
            actualResponse.writeHead(200,{"Content-Type" : mime.lookup(path.basename(fileWatched))})
            actualResponse.end(data)
        }
    });
}
