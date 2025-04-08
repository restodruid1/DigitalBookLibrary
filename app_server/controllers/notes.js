

const getBookNotes = async(req, res) => {
    //console.log(req);
    await fetch("http:localhost:3000/api/booksAPI/notes", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type" : "application/json"},
        body: JSON.stringify({id:req.query.id, username:req.user.username})
    })    
    .then(res => res.json())
    .then(data => res.render('notes', {data1: data, id:req.query.id}))   
    .catch((err) => {
        console.log("Error occured", err);  
    }); 
}

module.exports = {
    getBookNotes
}