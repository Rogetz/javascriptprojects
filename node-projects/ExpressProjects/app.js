// The error I had made initially was to require the connect instead of the express module.
var express = require("express")
var indexRoute = require("./routes/Index.js")

var port = 5004
var app = express()

// note that the settings for the views and the view engines are done before the view engine is actually installed.
app.set("views","/Views")

// Special notification that jade is not the same as ejs. Remember that jade currently is known as pug.
// jade has been renamed to pug.
app.set("view engine","pug")
app.use(function(req,res,next){
    console.log("added to test nodemon")
    next()
  })

/* The app also has no set method, check on how you can actually implement it.
app.set("View","Views")*/
app.use("/",function(req,res,next){
    console.log("Hello to the console")
    //note that whatever is below the final route gets executed even if its not the actual path that should be reffered to
    // Just ensure that you do a proper arrangement of paths.
    // make sure that the lower route is placed before the actual path.
    next()
})
// surprisingly there's no problem with the arrangement it still works regardless of the arrangement.
// However maintain this style of proper arrangement for my own safety.
app.use("/Home/Index",function(req,res,next){
    // Take keen note that you must use the new line to create a new line.
    res.write("Hello to the http side from the first Home  route\n")
    // once you've writen to the res.end you can only console but you can no longer use the res object, buy you can use the console.
    // Another thing to note is that the  next middleware is called by the app no matter what has been passed even if its the res.end that was previpusly called. Just ensure that the res object is not written to after the res.end has already been passed.
    next()
    // Heere the next method is not called.
    
})
/*app.use("/Home",function(req,res,next){
    console.log("Index page reached")
    res.end("Hello from the final route.")
    //note that whatever is below the final route gets executed even if its not the actual path that should be reffered to
    next()
})*/
app.use("/Home",indexRoute.index)
app.get("Home/Test",function(){
    res.end("Hello to the world")
})

/* The app has no inbuilt method called the get function
app.get("/Home",function(req,res,next){
    res.end("The home route reached")
})*/
app.listen(port,function(){
    console.log("app listening at port : "+port)
})
