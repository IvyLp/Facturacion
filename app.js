var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var cerrars = require('./routes/cerrar');
var eliminar = require('./routes/eliminar');
var tarifa = require('./routes/tarifas');
var region = require('./routes/regiones');
var empresa = require('./routes/empresa');
var usuarios = require('./routes/usuario');
var suscriptor = require('./routes/suscriptor');
var recaudo = require('./routes/recaudo');
var facturacion = require('./routes/facturacion');
var novedad = require('./routes/novedad');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: true, saveUninitialized:true, secret: "aeiou"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', users);
app.use('/',cerrars);
app.use('/',eliminar);
app.use('/',tarifa);
app.use('/',region);
app.use('/',empresa);
app.use('/',usuarios);
app.use('/',suscriptor);
app.use('/',recaudo);
app.use('/',facturacion);
app.use('/',novedad);



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
