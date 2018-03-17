let express = require('express'),
    router = express.Router(),
    validate = require('express-validation'),
    schema = require('./validation/userRoute'),
    userHandler = require('../handlers/userRoute');

// -> /user

// router.get('/confirm/email',)

router.post('/register', validate(schema.registration), userHandler.registration);
router.post('/login', validate(schema.login), userHandler.login);
router.post('/logout', validate(schema.logout), userHandler.logout);

module.exports = router;
