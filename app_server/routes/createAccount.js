var express = require('express');
var router = express.Router();

router.get('/', (req,res) => {
    //res.json(userData);
    res.render('createAccount', '');
});

module.exports = router;