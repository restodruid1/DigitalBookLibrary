const booksEndpoint = "http:localhost:3000/api/booksAPI";
const jwt = require('jsonwebtoken');
const verify = require('../routes/middleware');

const getAccountData = async function (req,res) {
    const option = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: req.body.username, password: req.body.password})
    };
    await fetch(booksEndpoint, option)
        .then((res) => res.json())
        .then((data) => {
            console.log(data[0].username);
            var payload = { username: data[0].username, password: data[0].password};
            
            if (data.length > 0) {
                const accessToken = jwt.sign(payload,process.env.JWT_SECRET_KEY, { expiresIn: '1d'});
                res.status(201).json({ accessToken: accessToken, message:"JWT CREATED"});
            } else {
                res.status(404).json({error: "Not Found"});
            }
        });
}

const getUserBooks = async function (req, res) {
    console.log(req.user.username);
    
    const option = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: req.user.username, password: req.user.password})
    };
    await fetch(booksEndpoint, option)
    .then((res) => res.json())
        .then((data) => {         
            if (data.length > 0) {
                //res.render('books', { userData : data });
                res.redirect('/users');
            } else {
                res.status(404).json({error: "Not Found"});
            }
        });
    //res.render('books', { })    
    //res.json({message: "THIS IS WORKING" + req.user.username + req.user.password});
}


module.exports = {
    getAccountData,
    getUserBooks
};