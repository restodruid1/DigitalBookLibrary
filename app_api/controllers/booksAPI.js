const mongoose = require('mongoose');
const Data = require('../models/booksData');
const Book = require('../models/booksData');
const Model = mongoose.model('books');


const validateAccount = async(req, res) => {
    var q = await Model.find({username: req.body.username, password: req.body.password}).exec();
    
    if(!q) {
        return res.status(404).json({message: "INVALID ACCOUNT"});
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

const userBookData = async(req, res) => {
    var q = await Model.find({username: req.body.username, password: req.body.password}).exec();
    if(!q) {
        return res.status(404).json({error : "USER NOT FOUND"});
        //return;
    }
    else {
        return res.status(200).json(q);
        //return res.status(200).json(req.body);
    }
}

const createAccount = async(req, res) => {
    var q = await Model.find({username: req.body.username}).exec();
    console.log(q);
    console.log("IN THE DB");
    if (q.length > 0) {
        return res.status(404).json({message : "THIS USERNAME ALREADY EXISTS"});
    } else {
        try {
            const newUser = new Book({
                username: req.body.username,
                password: req.body.password,
            });
            await newUser.save();
            return res.status(201).json({message : "ACCOUNT CREATED"});
        } catch (error) {
            res.status(500).json({error: "Error creating account", details: error.message});
        }
    }   
}

const addBookImage = async(req, res) => {
    console.log("In the DB" + req.user.username);
    console.log(req.body);
    console.log(req.files);
    //console.log("BUFFER: " + req.files[0].buffer);
    //res.json({message:"FILE SUBMITTED"});
    //try {
        const user = await Model.findOne({username: req.user.username});
        //console.log(user);
        //console.log(req.files[0].path);
        var bookPath = req.files[0].path;
        bookPath = bookPath.replace(/^public\\/, '');
        console.log("PATH: " + bookPath);
        user.books.push({
            image: bookPath,
            title: req.body.bookTitle,
            author: req.body.bookAuthor
        });
        await user.save();
        res.status(201).json({message: "Book Added!"});
    //} catch (err) {
    //    res.status(500).json({error: err.message});
    //}
}

const getBookNotes = async(req, res) => {
    //console.log(req.body.bookpath);
    //console.log(req.user.username);
    var data = await Model.find({username:req.body.username}).exec();
    try {
        var notes = data[0].books[req.body.id].notes;
        //console.log(notes);
        res.status(200).json(notes);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
}

const addNote = async(req, res) => {
    console.log(req.body.data);
    console.log(req.user);
    var user = await Model.findOne({username:req.user.username});
    try{
        //console.log(req.body.id);
        //console.log(user);
        var book = user.books[req.body.id]; 
        //console.log(book);
        book.notes.push(req.body.data);
        await user.save();

        res.status(201).json({message: "Note Added"});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }   
}

const deleteNote = async(req, res) => {
    
    var user = await Model.findOne({username:req.user.username});
    console.log(user);
    console.log(req.body.bookId);
    console.log(req.body.noteId);

    try {
        var book = user.books[req.body.bookId];
        book.notes.splice(req.body.noteId, 1);
        console.log(book);
        await user.save();
        res.status(299).json({message: "Note Deleted"});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
    
}

const updateNote = async(req, res) => {
    
    var user = await Model.findOne({username:req.user.username});
    //console.log(user);
    //console.log(req.body.bookId);
    //console.log(req.body.noteId);
    //console.log(req.body);
    try {
        var book = user.books[req.body.bookId];
        //console.log(book.notes);
        book.notes[req.body.noteId] = req.body.updatedNote;
        //console.log(book.notes[req.body.noteId]);
        //console.log(book.notes[req.body.noteId]);
        //console.log(req.body.updatedNote);
        book.markModified('notes');     // Tells MongoDB a change was made to an embedded item
        await user.save();
        res.status(299).json({message: "Note Updated"});
    } catch(err) {
        res.status(500).json({error: err.message});
    }    
}


module.exports = {
    validateAccount,
    allData,
    userBookData,
    createAccount,
    addBookImage,
    getBookNotes,
    addNote,
    deleteNote,
    updateNote
};