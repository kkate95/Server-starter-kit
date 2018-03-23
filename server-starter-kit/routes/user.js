let express = require('express'),
    router = express.Router(),
    validate = require('express-validation'),
    schema = require('./validation/userRoute'),
    userHandler = require('../handlers/userRoute'),
    commonUtil = require('../utils/common');

// -> /user

router.get('/confirm/email', validate(schema.confirmEmail), userHandler.confirmEmail);

router.post('/register', validate(schema.registration), userHandler.registration);
router.post('/login', validate(schema.login), userHandler.login);
router.post('/logout', validate(schema.logout), userHandler.logout);

router.get('/access/token', validate(schema.getAccessToken), userHandler.getAccessToken);

router.all('*', commonUtil.authBearer);

router.get('/profile', userHandler.getUserProfile);

router.put('/password/change', validate(schema.change_password), userHandler.changePassword);

module.exports = router;
