let express = require('express'),
     path = require('path'),
     favicon = require('serve-favicon'),
     morgan = require('morgan'),
     bodyParser = require('body-parser'),
     logger = require('./utils/logger');

let index = require('./routes/index'),
    users = require('./routes/users');

let Err = require('./utils/errors'),
    BaseError = require('./utils/errors/BaseError');


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
    next(new Err.NotFound('ERR_ROUTE_NOT_FOUND'));
});


app.use(function(err, req, res, next) {
    logger.error(err);

    if (!(err instanceof BaseError)) {
        err = new Err.Internal('ERR_INTERNAL');
    }

    res.status(err.status || 500).json(err);
});

module.exports = app;
