var express = require('express');
var router = express.Router();
var booksController = require('../controllers/books');
const verify = require('./middleware');
const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.post('/', booksController.getAccountData);
router.get('/', verify , booksController.getUserBooks);
router.post('/upload', verify, upload.array('image'), booksController.uploadImage);

module.exports = router;