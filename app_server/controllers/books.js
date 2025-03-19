const booksEndpoint = "http:localhost:3000/api/booksAPI";
const options = {
    method: "POST",
    headers: {
        Accept: "application/json",
    },
};
const options2 = {
    method: "GET",
    headers: {
        Accept: "application/json",
    },
};

const account = async function (req, res, next) {
    await fetch(booksEndpoint, options)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            let message = null;
            if (!(json instanceof Array)) {
                message = "API lookup error";
                json = [];
            } else {
                if (!json.length) {
                    message = "No accounts exist in our database";
                }
            }
            res.render('books', {userData: json});
        })
        .catch((err) => res.status(500).send(err.message));
};

const account3 = async function (req,res,next) {
    console.log("hi");
    const userData = req.query.userData;
    console.log("REQ QUERY" + userData);
    console.log(JSON.stringify({username:"Kevin", password:"Bristow"}));
    const options3 = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username1:"Kevin", password1:"Bristow"})
    };
    await fetch(booksEndpoint, options3)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            res.render('books', {userData:data});
        });
}

const account2 = async function (req,res,next) {
    console.log("hi");
    await fetch(booksEndpoint, options2)
        .then((res) => res.json())
        .then((json) => {
            //console.log(json);
            res.render('books', {userData:json});
        });
}
        
module.exports = {
    account,
    account2,
    account3
};