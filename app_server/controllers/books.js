const booksEndpoint = "http:localhost:3000/api/booksAPI";
const jwt = require('jsonwebtoken');


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
                res.cookie('token', accessToken, {
                    httpOnly: true,  // Prevents client-side JS access
                    secure: true,    // Ensures HTTPS-only usage
                    maxAge: 3600000  // 1 hour expiration
                });
                res.status(201).json({ accessToken: accessToken, message:"JWT CREATED"});
            } else {
                res.status(404).json({error: "Not Found"});
            }
        });
}

const getUserBooks = async function (req, res) {
    //console.log(req.user.username);
    //console.log("COOKIES: " + req.cookies.token);
    var test = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
    console.log(test);
    console.log("THIS ROUTE WORKS");
    if (req.user) {
        //res.status(250).json({message: "COOKIE VERIFIED"})
        var response = await fetch(booksEndpoint + '/user', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username: req.user.username, password: req.user.password})
        })
        .then((res) => res.json())
        .then(data => res.render('books', {userData: data, user:req.user.username[0], cssSheet: "/stylesheets/books.css"}));

    }
    else {
        res.status(450).json({message: "COOKIE BAD"});
    }
}

const uploadImage = async function (req, res) {
    console.log("HEREEEE" + req.user.username);
    console.log(req.body);
    console.log(req.files);
    console.log("BUFFER: " + req.files[0].buffer);
    res.json({message:"FILE SUBMITTED"});
}


module.exports = {
    getAccountData,
    getUserBooks,
    uploadImage
};