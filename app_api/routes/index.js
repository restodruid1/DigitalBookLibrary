const express = require("express");
const router = express.Router();

const booksAPIController = require("../controllers/booksAPI");

router
    .route("/booksAPI")
    .post(booksAPIController.validateAccount)
    .get(booksAPIController.userBookData);

router
    .route("/booksAPI/user")
    .post(booksAPIController.userBookData);


module.exports = router;