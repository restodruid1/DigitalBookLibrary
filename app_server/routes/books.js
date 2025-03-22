var express = require('express');
var router = express.Router();
var booksController = require('../controllers/books');


router.post('/', booksController.getAccountData);
router.get('/', booksController.getAccountData);

module.exports = router;