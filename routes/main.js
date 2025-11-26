// Create a new router
const express = require("express")
const router = express.Router()

// Simple auth guard for routes that require a session
const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/users/login')
    } else {
        next()
    }
}

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

// Redirect to user registration from home-level /register
router.get('/register', function (req, res) {
    res.redirect('/users/register')
})

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

// Logout route
router.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/')
        }
        res.render('logout.ejs')
    })
})


// Export the router object so index.js can access it
module.exports = router
