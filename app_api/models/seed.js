const Mongoose = require('./db');
const Book = require('./booksData');

var fs = require('fs');
var books = JSON.parse(fs.readFileSync('./public/data.json', 'utf-8'));

// Clear database, then populate it
const seedDB = async () => {
    await Book.deleteMany({});
    await Book.insertMany(books);
};

seedDB().then(async () =>{
    await Mongoose.connection.close();
    process.exit(0);
})