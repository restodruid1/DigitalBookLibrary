const mongoose = require('mongoose');
// Define the book schema
const bookSchema = new mongoose.Schema({
    username: {type: String, required: true, index: true} ,
    password: { type: String, required: true, index: true },
    books: { type: [{
        title: {type: String, default: "Default Title", index: true},
        author: {type: String, default: "Default Author", index: true},
        notes: {type: [String], default: ["Notes"]}
    }],
    default: [{
        title: "Default Title",
        author: "Default Author",
        notes: ["Notes"]
    }]
    }
});
const Book = mongoose.model('books', bookSchema);
module.exports = Book;