'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv/config');

var routes = require('./routes/index');
var users = require('./routes/users');

var Newhire = require('./models/Newhires')

var app = express();
//test
// view engine setup
app.set('views', path.join(__dirname, 'views'));

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//IMPORT ROUTES
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlersz

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

//CONNECT TO MONGO (CLOUD SERVER FOR NOW)
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('connected to DB')
);

app.get('/newhires', function (req, res) {
    res.send()
})

// http://localhost:___/newhires
app.post('/newhires', function (req, res) {
    var newhire = new Newhire();
    newhire.firstName = req.body.firstName;
    newhire.lastName = req.body.lastName;
    newhire.email = req.body.email;
    newhire.uin = req.body.uin;
    newhire.DOH = req.body.DIH;
    newhire.Pin = req.body.Pin;
    newhire.StatusCode = req.body.StatusCode;
    newhire.save();
    res.send('newhire created');
});