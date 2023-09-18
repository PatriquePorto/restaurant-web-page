let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
//Session Redis 
var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisClient = redis.createClient();
let formidable = require('formidable')

let indexRouter = require('./routes/index');
let adminRouter = require('./routes/admin');

let app = express();
/*  */
app.use(function(req, res, next) {

     if (req.method === 'POST') {
   
     let form = new formidable.IncomingForm({
       uploadDir:path.join(__dirname, "/public/images"),
       keepExtensions:true

     })

     form.parse(req, function(err, fields, files) {
       
        req.fields = fields
        req.files = files

        next()

     })

    } else {

      next()

    }

})    

//Middleware Redis
app.use(session({
 
  store: new RedisStore({
    client:redisClient,
    host:'localhost',
    port:6379
  }),
  //criptografia a sessão
  secret:'p@ssw0rd',
  resave: true,
  saveUninitialized: true
 
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

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
