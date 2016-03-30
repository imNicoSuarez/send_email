var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mailer = require('express-mailer');

var app = express();

mailer.extend(app, {
  from: 'no-reply@fboxapp.com',
  host: 'smtp.gmail.com',
  secureConnection: true,
  port: 465,
  transportMethod: 'SMTP',
  auth: {
    user: 'send.email@3coode.com',
    pass: '123sendemail'
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
app.post('/sendemail', function(req, res) {

  var toEmail= req.body.toEmail;
  var subject = req.body.subject;

  var dataContact = { email: req.body.fromEmail,
                      name: req.body.toName,
                      message: req.body.toMessage }

  console.log(dataContact, toEmail, subject);

  app.mailer.send('notifier', {
    to: [toEmail],
    subject: subject,
    data: dataContact
  }, function (err) {
    console.log('Ocurrio un Error', err);
  });


  res.json('Send Email Success');

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
