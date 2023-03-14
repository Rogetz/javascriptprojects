// was testing whether the get method is executed before the use method.
// My findings, it still follows the order, whichever is defined before the other is what gets executed.

let express = require("express")
let session = require("express-session")

let app = express()
let port = 5010

app.use(session({
    // this session middleware has a set of options.
    // Here I haven't set the store for the session and hence we are using the default in memory storage
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: true
}))
// seems like the expression midlleware provides the req.session is there's no response retured. I'll do some more research on this I'll see about it
// For now use the req.session when using this express session middleware
// try with the response session after this.
//Ok this didn't work since express dropped support for the sessions middleware, so I'm going to test this issue of order somewhere else.
app.get("/",function(req,res,next){
    // This session message worked well when setting the method was set first before calling the mehto using it.
    req.session.message = "I am the session message"
    console.log("get method reached")
    // ensure you call the next method please.
    // else the below method won't be called.
    next()
})

// finally proved that express works with the order, so if you want to read whatever is set  byt he get method, then ensure its above the use method.
app.use(function(req,res,next){
    let message = req.session.message || "nothing"
    console.log("This is the session message set by the app.get,shouldn't be nothing:\n"+message)
    next()
})

app.get("/",function(req,res,next){
    // This session message worked well when setting the method was set first before calling the mehto using it.
    req.session.message = "I am the session message"
    console.log("get method reached")
    // ensure you call the next method please.
    // else the below method won't be called.
    next()
})

app.listen(port,function(){
    console.log("server listening at port: "+port)
})