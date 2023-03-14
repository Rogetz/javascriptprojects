
// My comment here: Note that the express-generator is installed with the npx install -g express-generator for global installations and ommiting the -g for local but who wants a local generator, nobody hahaha.
// so to generate the first template files with the express generator use: npx express-generator
// you can as well simply call express with some configurations to generate template files.
// e.g express --view=pug project1 ,which simply means the app will be created in a folder in the current working directory called project1 and the view engine will be set to pug.
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// ensure that you set your own environment port, so that the www file will not set the default 300 port which happens to cause a lot of very many errors.
process.env.PORT = 5008

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
