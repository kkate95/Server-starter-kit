let express = require('express'),
    router = express.Router(),
    validate = require('express-validation'),
    schema = require('./validation/userRoute'),
    userHandler = require('../handlers/userRoute');

// -> /user

router.post('/register', validate(schema.registration), userHandler.registration);

router.post('/login', validate(schema.login), userHandler.login);

module.exports = router;
