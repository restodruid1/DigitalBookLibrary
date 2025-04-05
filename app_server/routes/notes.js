var express = require('express');
var router = express.Router();
var notesController = require('../controllers/notes');
const verify = require('./middleware');

router.get('/', verify, notesController.getBookNotes);

module.exports = router;