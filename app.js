var createError = require('http-errors');
var express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const hbs = require('hbs');

var indexRouter = require('./app_server/routes/index');
var userRouter = require('./app_server/routes/users');
var bookDataRouter = require('./app_server/routes/books');
var createAccountRouter = require('./app_server/routes/createAccount');
var loginRouter = require('./app_server/routes/login');
var apiRouter = require('./app_api/routes/index');

require('./app_api/models/db');
// Handlebars helper function for books.hbs
hbs.registerHelper('eq', function (a, b) {
  return a === b;
});

var app = express();
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials: true}));

app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});


// Creates URL and routes to router file
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/books', bookDataRouter);
app.use('/createAccount', createAccountRouter);
app.use('/api', apiRouter);
app.use('/login', loginRouter);



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
