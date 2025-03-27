var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login');
const verify = require('./middleware');

router.post('/', loginController.getAccountData);
//router.get('/', verify , booksController.getUserBooks);

module.exports = router;