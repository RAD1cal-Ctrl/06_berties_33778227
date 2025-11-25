// Create a new router
const express = require("express")
const router = express.Router()

// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

// Show the "add book" form
router.get('/addbook', function (req, res, next) {
    res.render('addbook.ejs');
});

// Handle form submission and insert into database
router.post('/bookadded', function (req, res, next) {

    // saving data in database
    let sqlquery = "INSERT INTO books (name, price) VALUES (?, ?)";

    // values from the form
    let newrecord = [req.body.name, req.body.price];

    // execute sql query
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.send(
                'This book is added to database, name: ' +
                req.body.name + ' price ' + req.body.price
            );
            // (optional) later we could render a nice EJS page instead
        }
    });
});


// Export the router object so index.js can access it
module.exports = router