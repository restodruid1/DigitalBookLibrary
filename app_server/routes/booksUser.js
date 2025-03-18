var express = require('express');
var router = express.Router();
var userData = require('../../public/data.json');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./public/data.json','utf8'));
var booksController = require('../controllers/books');

router.post('/test', (req, res) => {
    res.render('books', {userData});
})

module.exports = router;