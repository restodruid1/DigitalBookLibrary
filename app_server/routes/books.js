var express = require('express');
var router = express.Router();
var booksController = require('../controllers/books');
const verify = require('./middleware');

router.post('/', booksController.getAccountData);
router.get('/', verify , booksController.getUserBooks);

module.exports = router;