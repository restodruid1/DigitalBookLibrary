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

const account2 = async function (req,res,next) {
    console.log("hi");
    await fetch(booksEndpoint, options2)
        .then((res) => res.json())
        .then((json) => {
            console.log(json);
            res.render('books', {userData:json});
        });
}
        
module.exports = {
    account,
    account2
};