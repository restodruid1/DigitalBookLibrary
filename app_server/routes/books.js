var express = require('express');
var router = express.Router();
var userData = require('../../public/data.json');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./public/data.json','utf8'));
var booksController = require('../controllers/books');
var apiController = require('../../app_api/routes/index');
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

router.get('/', (req,res) => {
    //res.json(userData);
    res.render('books', { userData });
});
*/
//router.post('/', booksController.account);
//router.post('/', booksController.account);
//router.get('/', booksController.account2);
router.post('/', booksController.account3);
router.get('/', booksController.account3);
//router.post('/data', booksController.account);
/*
router.post('/data', function(req, res, next) {
    console.log("here222222");
    //res.render('books', {userData});
    res.redirect('/books', )
    console.log("here");
});
*/
module.exports = router;