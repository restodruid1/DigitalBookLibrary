var express = require('express');
var router = express.Router();
const verify = require('./middleware');

/* GET home page. */
router.get('/', verify, function(req, res, next) {
  
  res.render('users', { message: req.user.username});
});

module.exports = router;