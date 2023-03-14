let http = require("http")
let url = require("url")
let querystring = require("querystring")

let server = http.createServer(function(req, res){
    if(req.method == "POST"){
        let parsedUrl = url.parse(req.url)
        let queryToParse = parsedUrl.query    
        let parsedQuery = querystring.parse(queryToParse)
        res.writeHead(200,{"content-length": Buffer.byteLength(parsedQuery)})
        res.write(parsedQuery)
        res.end()
    }
}).listen(3002)
console.log("server running on local host 3002")
