let express = require('express'),
     path = require('path'),
     favicon = require('serve-favicon'),
     morgan = require('morgan'),
     bodyParser = require('body-parser'),
     logger = require('./utils/logger');

let index = require('./routes/index'),
    users = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/*******************************************ROUTES*******************************/
app.use('/', index);
app.use('/users', users);


app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {
    logger.error(err)
    res.status(err.status || 500).json(err);
});

module.exports = app;
