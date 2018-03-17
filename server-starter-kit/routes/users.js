let express = require('express'),
    router = express.Router(),
    validate = require('express-validation'),
    schema = require('./validation/login'),
    userHandler = require('../handlers/userRoute')
;

// -> /user

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', validate(schema.registration), userHandler.registration);

router.post('/login', validate(schema.login), (req, res, next) => {


});

module.exports = router;
