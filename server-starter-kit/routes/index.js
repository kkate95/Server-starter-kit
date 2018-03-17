let express = require('express'),
   router = express.Router(),
  userRoute = require('./user');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use('/user', userRoute);



module.exports = router;
