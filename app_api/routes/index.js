const express = require("express");
const router = express.Router();
const fs = require('fs');
const booksAPIController = require("../controllers/booksAPI");
const verify = require('../../app_server/routes/middleware');
const multer  = require('multer');
//const upload = multer({ dest: 'uploads/' })
//const storage = multer.memoryStorage()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(req.body.bookTitle);
      const user = req.user.username;
      fs.mkdirSync('public/uploads/'+ user, { recursive: true});
      cb(null, 'public/uploads/'+user);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, req.body.bookTitle + 
        '-' + 
        file.fieldname +
        "-" + 
        uniqueSuffix + 
        '.jpg');
    }
  })
const upload = multer({ storage: storage });


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

router
    .route("/booksAPI/notes")
    .post( booksAPIController.getBookNotes);

router
    .route("/booksAPI/addNote")
    .post(verify, booksAPIController.addNote);

router
    .route("/booksAPI/deleteNote")
    .delete(verify, booksAPIController.deleteNote);

router
    .route("/booksAPI/updateNote")
    .put(verify, booksAPIController.updateNote);


module.exports = router;