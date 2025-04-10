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
            var userName = data[0].username;
            var passWord = data[0].password;
            var payload = { username: userName, password: passWord};
            
            // User found
            if (data.length > 0) {
                const accessToken = jwt.sign(payload,process.env.JWT_SECRET_KEY, { expiresIn: '1d'});
                res.cookie('token', accessToken, {
                    httpOnly: true,  // Prevents client-side JS access
                    secure: true,    // Ensures HTTPS-only usage
                    maxAge: 3600000  // 1 hour expiration
                });
                res.status(201).json({ accessToken: accessToken, message:"JWT CREATED"});
            } else {
                res.status(404).json({error: "User Not Found"});
            }
        });
}

const accountLogout = async function (req, res) {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Strict',
        secure: true
      });
      res.sendStatus(200);
}


module.exports = {
    getAccountData,
    accountLogout
}