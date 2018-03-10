let express = require('express'),
    router = express.Router(),
    validate = require('express-validation'),
    schema = require('./validation/login');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', validate(schema.login), (req, res, next) => {


});

module.exports = router;
