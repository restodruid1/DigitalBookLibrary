const booksEndpoint = "http:localhost:3000/api/booksAPI";

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
            console.log(JSON.stringify(data));
            if (data.length > 0) {
                res.render('books', {userData: data});
            } else {
                res.status(404).json({error: "Not Found"});
            }
        });
}
        
module.exports = {
    getAccountData
};