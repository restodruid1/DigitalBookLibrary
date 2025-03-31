const express = require("express");
const router = express.Router();

const booksAPIController = require("../controllers/booksAPI");
const verify = require('../../app_server/routes/middleware');
const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router
    .route("/booksAPI")
    .post(booksAPIController.validateAccount)
    .get(booksAPIController.userBookData);

router
    .route("/booksAPI/user")
    .post(booksAPIController.userBookData);

router
    .route("/booksAPI/createAccount")
    .post(booksAPIController.createAccount);

    router
    .route("/booksAPI/addBookImage")
    .post(verify, upload.array('image'),booksAPIController.addBookImage);


module.exports = router;