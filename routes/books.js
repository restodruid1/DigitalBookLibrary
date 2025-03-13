var express = require('express');
var router = express.Router();
var userData = require('../public/data.json');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./public/data.json','utf8'));
/*
router.get('/books', function(req, res, next) {
    //res.send(data);
    res.json(userData);
  });
*/
/*
router.get('/', function(req, res, next) {
    //res.send(userData);\
    res.render("books");
});
*/
router.get('/', (req,res) => {
    //res.json(userData);
    res.render('books', { userData });
});

module.exports = router;