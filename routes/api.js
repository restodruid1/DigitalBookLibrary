var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Data = require('../models/booksData');
const Model = mongoose.model('books');

router.post('/' , async (req, res) => {
    //const q = await Model.find({username: "Kevin", password: "Bristow"}).exec();
    const q = await Model.find({username: req.body.username1, password: req.body.password1}).exec();
    //const { username, password } = req.body;
    //console.log('Received data:', req.body);
    if(!q) {
        //return res.status(404).json(err);
        return;
    }
    else {
        return res.status(200).json(q);
        //return res.status(200).json(req.body);
    }
});

module.exports = router;
