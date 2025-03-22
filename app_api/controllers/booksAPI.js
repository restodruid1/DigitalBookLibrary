const mongoose = require('mongoose');
const Data = require('../models/booksData');
const Model = mongoose.model('books');


const validateAccount = async(req, res) => {
    var q = await Model.find({username: req.body.username, password: req.body.password}).exec();
    //q = await Model.find({username: "Kevin", password: "Bristow"}).exec();
    if(!q) {
        return res.status(404);
        //return;
    }
    else {
        console.log(q);
        return res.status(200).json(q);
    }
}

const allData = async(req, res) => {
    const q = await Model.find({}).exec();
    
    if(!q) {
        //return res.status(404).json(err);
        return;
    }
    else {
        return res.status(200).json(q);
        //return res.status(200).json(req.body);
    }
}

module.exports = {
    validateAccount,
    allData
};