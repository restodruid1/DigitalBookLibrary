var express = require('express');
var router = express.Router();
var createRouter = require('../controllers/createAccount');

router.get('/', createRouter.registerUser);
    

module.exports = router;