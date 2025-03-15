const mongoose = require('mongoose');
// Define the book schema
const bookSchema = new mongoose.Schema({
    username: {type: String, required: true, index: true} ,
    password: { type: String, required: true, index: true },
    books: { type: [{
        title: {type: String, required: true, index: true},
        author: {type: String, required: true, index: true},
        notes: {type: [String], default: ["Notes"]}
    }]}
});
const Book = mongoose.model('books', bookSchema);
module.exports = Book;