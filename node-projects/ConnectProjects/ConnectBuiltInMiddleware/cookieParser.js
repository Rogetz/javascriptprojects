var connect = require("connect")
var url = require("url")

let app = connect()

// cookies are sent by the client remember. Cookie parser simply parses the cookie and determines the signed cookiies
// cookie parser was deprecated from version 2.21 of express , so you have to install it manually, good thing is I know how the use of cooki parser and session(for persisting data all through the lifetime of an app.)
//app.use(connect.cookieParser())
.use(function(req,res,next){
    console.log("here the cookies has not been parsed to the req.cookies using the cookieParser middleware\n However I accessed the header through the curl --head command")
    // I mananged tp access this cookie I set through the curl --head command
    res.setHeader("Set-Cookie","name=Tom")
    // funnny thing with headers is that you can set anything and whatever provided its kept inside the setHeader function.
    res.setHeader("set-My-Headeer","Its mine")
    let headers = res.getHeaders
    // this is not the name we want its the name of the function.
    // here is where I am seeing the essence of connect
    console.log(headers.name)
    res.setHeader("Content-Type","text/plain")
    res.end("some output returned in the console.\nand tested with curl command line")
})
.listen(3702)
console.log("app listening at port 3702")