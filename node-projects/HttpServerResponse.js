var http = require("http")

var server = http.createServer(function(req,res){
    let finalData = ""
    req.on("data",function(chunk){
        finalData += chunk
    })
    req.on("end",function(){
        // for displaying in the browser couldn;t work well since refreshing the browser creates a newer instance.
        //res.write(finalData)

        // worked perfectly fine for displaying in the console, It could also possibly work well with a socket, since it doesn't create a new http request.
        console.log(finalData)
        res.end("\n end of data")
    })   
})
server.listen(3074)
console.log("listening at port 3074")