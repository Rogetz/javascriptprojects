// Here I'll use the content-length to prevent the request from chunking data.

let http = require("http");
let url = require("url");
let items = [];

let server = http.createServer(function(request,response){
    if(request.method == "GET"){
        parsedUrl = url.parse(request.url)
        let value = parsedUrl.pathname
        response.end(value)
    }
    // note that if  it were a normal API I would use this criteria of reading the path name, most probably.
    if(request.method == "POST"){
        request.setEncoding("utf-8")
        parsedUrl = url.parse(request.url)
        let value = parsedUrl.pathname
        let item = ""
        // This data event listener is mostly used after you've set the character encoding to utf-8s
        // That way you can get the data easily.
        request.on("data",function(data){
            item +=  data
        })
        request.on("end",function(){
            // when you set the content-length the Api doesn't return broken code, instead it brings out the full text.
            // and also while using the content-length, ensure that you have accounted for al the data to be sent back, cause if you dont, it may be cut out during the return of the response.
            // That's actually how important headers are, they can determine whether some data will be displayed or not.
            response.writeHeader(200,{"content-length": Buffer.byteLength(item+"\n"+value)})
            response.write(item+"\n"+value)
            response.end()
        })
    }
}).listen(3200)
console.log("Server listening at port 3200")
