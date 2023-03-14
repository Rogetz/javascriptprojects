var http = require("http")// the server itself.
var url = require("url");

let items = ["First Item"]



let server = http.createServer( function(req, res){
    // It worked perfectly fine.
    // Just ensure that you use the http without the s, for it to work.
    if(req.method == "GET"){
        stringifiedArray = items.join("\n")
        res.end(stringifiedArray)
    }
    // Since this is a post method, am using the encoding to direcly parse the arguments passed as strings
    if(req.method == "POST"){
        // Unneccesary in this case.
        //parsedUrl = url.parse(req.url)
        req.setEncoding("utf-8")
        /*items.forEach(function(item,index){
            res.write(item)
        });*/
        let item = " "
        // when you use spacing in the string of words passed to the curl command, you'll find that our programm is unable to read the string correctly.
        req.on("data",function(chunks){
            item += chunks
        });
        req.on("end",function(){
            items.push(item)
            console.log(item)
            res.end(item);
        })

    }
}).listen(4500);
console.log("listening at port 4500")

