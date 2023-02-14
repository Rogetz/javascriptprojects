var http = require('http')

debugger
let server = http.createServer((req,res) => {
    res.writeHead(200,"Server status Ok",{"content-type" : "text/plain"})
    /*res.write("Hello over there my guy, this is my server response", function(error){
        console.log("an error occured while writing")       
    })*/
    /*
    res.write("why is this server not running as expected ",function(error){
        console.log(error)
    })*/
    debugger
    //res.write("testing it againe") // I dont understand why the write function aint working as I wanted it to. I'll check that out later.
    res.end("Testing my server, its working pretty fine with the end method, little known of the errors with the write function.")// worked perfectly fine.
}).listen(5002); // after a call back function or a self triggered function, always use a colon.
// although we know in some other simple cases you dont have to use it
debugger
console.log("server running on local host 5002")
// this event emmitters aint working as expected, look for some other ones later on.
/*server.on("",function(){
    console.log("Server running on local host port 5002")
})
server.on("connection",function(){
    console.log("server connected to at localhost on port 5002")
})*/