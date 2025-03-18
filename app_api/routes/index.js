const express = require("express");
const router = express.Router();

const booksAPIController = require("../controllers/booksAPI");

router
    .route("/booksAPI")
    .post(booksAPIController.validateAccount);

router
    .route("/booksAPI")
    .get(booksAPIController.all);
    



module.exports = router;