// This is basically contains the code for the server and all manner of serving and serving alone

var mime = require("mime") // for automatically detecting the file types of different files.
var http = require("http")// for creating the server
var fs = require("fs")// for reading and writing to the files and directories.
var path = require('path')// for joining different paths.
const SocketServer = require(path.join(__dirname,"SocketServer.js"))// for my own created socket Server.

// importing an object constructor from a module finally worked.
// remember that since I only had one constructor class immported using module.exports I can simply reffer to the object directly from the 
// imported module without using a dotnotation, since remeber it's merely impossible to create a new instance of an object through a dot notation like new watcher.Watcher("Paul"), that would never work since the module name is not an object constructor in itself.
const watcher = require(path.join(__dirname,"WatcherProgramm.js"))


var server = http.createServer(function(request,response){
    // for every function within a function, just ensure that the calling function is the absolute function that you want to be returned in the end.
    pageServer(request,response)
}).listen(5400);


SocketServer.listen(server)
console.log("listening at port 5400")

function pageServer(request,response){
    // for reading from the files stipulated.
    var abspath = absolutePathCreator(request)
    // I'm looking for a place to add the watcher class.
    console.log("absolutePath returned"+abspath)
    readingFiles(abspath,request,response) // we readFiles before passing over to the watch class.
    // pass the abspath and the response object to the watcher.
    // I've used module.exports, so I don't need to use the dot notation, I call the function directly.
    /*let watchInstance = new watch(abspath,response)
    watchInstance.start()*/
    // finally importing the module worked.
    let watcherInstance = new watcher(abspath,response);
    watcherInstance.start()
    //watcher.starter(abspath,response)
    // I'll try adding the watcher here and see if it can work with the readingFiles method in this class.
}
function readingFiles(abspath,request,response){
    fs.readFile(abspath,function(err,data){
        if (err){
            // for serving the invalid pages
            response.writeHead(404,{"content-type":"text/plain"})
            response.end("Really sorry we dont have that one: "+request.url)
        }
        else{
            // for serving the valid 
            // the setHeader is not a must, but here it simply means I don't want the browser to interpret any type for me
            // I 
            //response.setHeader("Content-Type-Options","nosniff")
            response.writeHead(200,{"Content-Type" : mime.lookup(path.basename(abspath))})
            response.end(data)
            // It can actually still log some data to the console as the server is listening.
            //console.log(dataRead.toString())unnecessary was for testing only.
        }
    });
}

function absolutePathCreator(request){
    let staticExtensionRegex = /\.+\w+$/
    let absolutePath = ""
    // in request urls,every request is appended a first "/" sign, even if you don't specify it, so I have to accomodate it.
    let nodeModulesRegex = /^\/node_modules/ // escape the / sign since it can signify the begining of a regex pattern
    console.log("testing the different mathes found"+request.url.match(nodeModulesRegex)+"\n")
    // I'm testing with an array of absolute paths to be created
    console.log("The different request urls found"+request.url)
    // for observing the requests and identifying where they should redirect to.
    if(request.url == "/"){
        console.log("entered the / empty url")
        absolutePath = path.join(__dirname,"public/index.html")
        console.log(absolutePath)
        return absolutePath;
        //return absolutePath
    }
    else if(request.url.match(staticExtensionRegex) != null && request.url.match(nodeModulesRegex) != null){
        console.log("entered the node modules section")
        absolutePath = path.join(__dirname,request.url)
        console.log(absolutePath)
        return absolutePath;
        //return absolutePath  
    }
    // This was actually the game changer I'm glad,
    // also never forget to setHeader Content-Type-Options to nosniff
    // what's remaining is for the socket.io file, cause its not in the same directory as the public one but I could add another if inside this one here to test, if the file is not found, to be looked for in the node_modules folder or the root folder.
    else if(request.url.match(staticExtensionRegex) != null && request.url.match(nodeModulesRegex) == null){
        console.log("entered the css and normal client side js")
        absolutePath = path.join(__dirname,"public"+request.url)
        return absolutePath;
        //return absolutePath
        // I have not yet added the server processing for the socket, module,
        // I might have to edit how i call js files in the front-end.
    }
    else if((request.url != "/" && request.url.match(staticExtensionRegex) == null) && request.url.match(nodeModulesRegex) != null){
        if(request.url.indexOf(".html") == -1  && request.url != "/"){
            console.log('enetered the section with no specified url')
            request.url += ".html" // added this since I assume all pages I'll be serving here are html pages.
        }
        absolutePath = path.join(__dirname,"public"+request.url)
        return absolutePath;
    }
}

