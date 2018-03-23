let express = require('express'),
     path = require('path'),
     favicon = require('serve-favicon'),
     morgan = require('morgan'),
     bodyParser = require('body-parser'),
     logger = require('./utils/logger'),
    commonUtil = require('./utils/common'),
    config = require('./config'),
    passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy;

let routes = require('./routes/index');

let Err = require('./utils/errors'),
    BaseError = require('./utils/errors/BaseError'),
    ev = require('express-validation'),
    langMessage = require('./lang');


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
app.use(passport.initialize());

passport.use(new BearerStrategy({ passReqToCallback: true },
    (req, token, done) => commonUtil.getDataFromAccessToken(token)
        .then(user => Promise.resolve(done(null, user)))
        .catch(err => done(err))
));

/* *********************************** ROUTES ****************************** */
app.use('/', routes);

app.use(function(req, res, next) {
    next(new Err.NotFound('ERR_ROUTE_NOT_FOUND'));
});
/* ************************************************************************* */

ev.options({
    allowUnknownBody: false,
    allowUnknownQuery: false,
    allowUnknownParams: false
});

app.use((err, req, res, next) => {
    if (err instanceof ev.ValidationError) {
        logger.error(
            Object.assign(
                {},
                err,
                {
                    ip:         req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                    route:      `*** ->>  ${req.method} ${req.path}  <<- ***`,
                    headers:    req.headers,
                    params:     req.params,
                    query:      req.query,
                    body:       req.body,
                    user:       req.user
                },
                {
                    error1: err.errors[0],
                    error2: err.errors[1],
                    error3: err.errors[2],
                    error4: err.errors[3]
                }
            )
        );
        return next(new Err.BadRequest('ERR_BAD_REQUEST'));
    }

    next(err);
});

app.use((err, req, res, next) => {
    let lang = req.headers['accept-language'];

    logger.error(err);

    if (!(err instanceof BaseError)) {
        err = new Err.Internal('ERR_INTERNAL');
    }

    if (!langMessage[lang]) {
        lang = config.defaultLanguage;
    }

    err.Message = langMessage[lang][err.code];

    res.status(err.status || 500).json(err);
});

module.exports = app;
