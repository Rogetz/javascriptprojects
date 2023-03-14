var http = require("http")

/* seems like it doesnt work well when its all coming from the same code base.
var server = http.createServer(function(req,res){
    let finalData = ""
    req.on("data",function(chunk){
        finalData += chunk
    })
    req.on("end",function(){
        res.write(finalData)
        res.end("\n end of data")
    })   
})
server.listen(3074)
console.log("listening at port 3074")
*/


let request = http.request({
    method : "POST",
    // here I can even put the port that already has a server running.
    port: 3074,
    headers: {
        "Content-Type" : "text/plain"
    }
})
request.write("Hello I'm testing the request object")
request.end()