// Note that for apps run by the express generator, they need to have been defined in the json file and must be instaled in the node modules section of the app, else it will throw an error even if the module is global.

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// I added these
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
// dotenv module simply makes the .env variable available in the process.env attribute // actually I dont need to save the results of requiring the module
const dotnev = require("dotenv").config()
// worked perfectly fine
console.log(process.env.MY_TEST_VARIABLE)

// routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flashRouter = require("./routes/flash")

//lib models
var booksMessage = require("./lib/booksMessage")
var user = require("./lib/user");
var basicAuth = require("./lib/basicAuth")
const { text } = require('express');

process.env.PORT = 5008 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(basicAuth.myBasicAuth)// It was initially causing errors since I called a function in the same method with a default exports, avoid using another exports where theres a default module.exports
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// testing to see if I can work without the express-session module
app.use(session({
  // this session middleware has a set of options.
  // Here I haven't set the store for the session and hence we are using the default in memory storage
  secret: 'secret$%^134',
  saveUninitialized: false,
  resave: false
}))
// These passport middleware must be used after the session has been created.
/*app.use(passport.initialize())
app.use(passport.session())// sets a req.user object that can be used to access the details of the current user.
// One note is that sessions are not required in api requests, since for each API there needs  to be en authentication header.
*/

app.use(flash()) // added the fkash middleware after the session since its dependent of it.
app.use(function(req,res,next){
  // I have pointed the res.locals.message to point to the req.flash method.
  // I've pointed the res.locals.message here.
  res.locals.message = req.flash()
  next()
})
// express basic authentication was deprecated so I need to validate it myself in the middleware am using
//app.use(express.basicAuth())
/*
app.use(express.b
app.use(function(req,res,next){
  req.flash("Test","This is my message")
  // kumbe the res.locals can be set outside the exaxt place where the actual flash is set
  // Its not a must as I previously thought
  next()
})*/

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// this method below is a faulty one since it doesn't follow the order.
/*app.use(function(req,res,next){
  res.locals.messages = req.session.messages
})
app.use("/home",function(req,res,next){
  req.session.messages = "This is the set session message"   
  res.render("index",{title : "index"})
})
*/
app.use("/home",function(req,res,next){
  req.session.messages = "This is the set session message"   
  res.locals.messages = req.session.messages
  res.render("index",{title : "index"})
})
app.get("/flashTest",flashRouter)
app.get("/test",function(req,res,next){
  // I have pointed the res.locals.message to point to the req.flash method.
  // set the res.locals to the req.flash method while in the redirected router
  //res.locals.message = req.flash()
  res.render("test")
})
// tested the css part with thiis and it perfectly workde
app.get("/flash",function(req,res,next){
  res.render("flash")
})
app.get("/mine",function(req,res,next){
  res.render("mine")
})
// worked well except for the redirect. since there am in dilemma of whether it should be kept before or after the redirect.
/*this is mine, workde very well.
app.use("/home",function(req,res,next){
  // this worked perfectly fine.
  // just actually realized that in the book they also used req.session object and not any res.session object
  req.session.messages = "This is the set session message"   
  res.redirect("/")
  res.locals.messages = req.session.messages  
})app.use(booksMessage)
*/

/* This was the books module, pne fact is that the redirect deletes the res.locals variables for sure,
so to persist them the only way is to store them in the res.session variable and then set it to the res.locals variable inside the redirected route definition.
All I need to create as a method is a method that can  always fetch data from the res.session array and set all the session variables to the local, this method is to be called each time inside another route without or with parameters since in some cases the routes might be redirected paths which just need to render somethiing tha was created by the previous function that called them.
app.use("/home",function(req,res,next){
  res.myerror("home error")
  res.render("index",{
    title: "index"
  })
  next()// using this style to try see if it shall allow for setting of the res.local.messages variable
})
app.use(booksMessage)
*/

// to create a post request in curl use this parameter
//curl -d "name=Tommy&&class=form three"

/*fot testing the different styles of setting api routes*/
app.post("/api/addOne",function(req,res,next){
  // The req.body object is there but then there's no actual body parser for setting each element in the body respectively
  console.log(typeof(req.body))
  //console.log(typeof(testName))
  res.send("The name is "+req.body.name+" and the class is "+req.body.class)
})
app.get("/api/:id",function(req,res,next){
  res.send("reached the :page")
})
app.get("/api/:page?",function(req,res,next){
  res.send("reached the :page?")
})

app.get("/api/page/mine",function(req,res,next){
  res.send("reached the mine api")
})

//  Here I created a dubed error for the sake of testing the 505 erroe handling of mine.
app.use("/errorTest",function(req,res,next){
  let error = new Error("I created this error") // also do remeber that whatever error  that is encountered, it will be redirected to our error handler asctually error handlers are the only middleware types accepting four parameters. below
  next(error)
})

// the 404 response
app.use(function(req,res,next){
  res.status(404).format({
    html: function(){
      res.render("my404")

    },
    Json : function(){
      res.send({message : "Page not found"})
    },
    xml : function(){
      res.write("<error>\n")
      res.write("      <message>  404 page not found\n")
      res.end("</error>")
    },
    text : function(){
      res.send("404 error page not found")
    }
  })

})

// the error handler.
// Remember here that I have not created an actual error.
app.use(function(error,req,res,next){
  // you need to set the status code directly over here foe the 500 error
  res.statusCode = 500 // the statue code to be set in the header

  // also note that if you are calling it using curl ensure that there's no spacing between the -H headr and its text
  // e.g curl ... then -i -H "Accept: application/json"
  // also note that the -i header can be used in any typr of content format.
  // It simply ensures that the response headers are viewable to however has sent the request.
  // note that here we set the status code manually unlike in the 404 error where it was ready made for us by the method.
  // use the res.format  method to handle the content negotiation here and not the res.status(404).format handler
  res.format({
    html : function(){
      res.render("my505")
    },
    Json : function(){
      res.send({505 : "Internal server error we'll be back",error : error.message})
    },
    xml : function(){
      res.write("<error>\n")
      res.write("       <messaage>505 Internal server error we'll be back shortly </message>")
      res.end("</error>")
    },
    text : function(){
      res.send("Internal server error, we'll be back")
    }
  })
})


// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));// this creates an error for a 404 error of which in my app I don't think I'll need that.
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/

module.exports = app;
