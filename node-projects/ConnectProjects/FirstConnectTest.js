// connects logic is very simple.
// it simply passes over the req and res objects to subsequent methods till one of them decides to respond to the request after which the diapatcher stops.
// If none responds to it, it returns a 404 error.

var connect = require('connect');

let app = connect();

function helloFunction(req,res){
    console.log("hello world")
    // note that whenever you use the res.end, you automatically stop the connect's dispatcher from continuing with its job.
    // so for it to pass it on to the dispatcher ensure that you dont finish it.
    // never forget to write the content type header to ensure whatever you've passed gets interpreted correctly.
    res.end('heres the reponse');
}

function myCustomizer(name){
    
    let fullName = "Ronny Odhiambo"

    return function(req,res,next){
        // headers are set before the first instance of setHeader is called.
        res.setHeader('Content-Type','text/plain');
        res.write("Hello there "+fullName)
        next()
    }
}
app.use(function(req,res,next){
    console.log('test trials');
    // ensure that you call the next method for the execution to be passed to teh dispatcher so that it can call the next function
    // remember also that for you to use the next method, you have to pass it as a parameter to this method.
    next();
})
.use(myCustomizer("Paulo"))
.use(helloFunction)
.listen(3700);
console.log("listening at port 3700")