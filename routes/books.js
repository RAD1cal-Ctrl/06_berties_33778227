const express = require("express")
const router = express.Router()

// Search page
router.get('/search', function(req, res, next) {
    res.render("search.ejs")
});

// Search result page
// Advanced search – partial title match
router.get('/search-result', function (req, res, next) {
    const keyword = (req.query.keyword || "").trim();          // from the form
    const searchTerm = `%${keyword}%`;

    const sqlquery = "SELECT * FROM books WHERE name LIKE ? ORDER BY name ASC";
    db.query(sqlquery, [searchTerm], (err, result) => {
        if (err) {
            return next(err);
        }
        res.render('search-result.ejs', {
            keyword: keyword,
            foundBooks: result
        });
    });
});

// Show the "add book" form
router.get('/addbook', function (req, res, next) {
    res.render('addbook.ejs');
});

// Handle add book form submission
router.post('/bookadded', function (req, res, next) {
    const sqlquery = "INSERT INTO books (name, price) VALUES (?, ?)";
    const newrecord = [req.body.name, req.body.price];

    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            return next(err);
        }
        res.render('addbook.ejs', { message: 'Book added successfully!' });
    });
});


// BOOKS LIST ROUTE — MUST be BEFORE module.exports
router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM books"; 
    
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
            return
        }
        res.render("list.ejs", { availableBooks: result })
    });
});

// Bargain books – price less than £20
router.get('/bargainbooks', function (req, res, next) {
    const sqlquery = "SELECT * FROM books WHERE price < 20 ORDER BY price ASC";

    db.query(sqlquery, (err, result) => {
        if (err) {
            return next(err);
        }
        res.render('bargainbooks.ejs', { bargainBooks: result });
    });
});


// Export router LAST
module.exports = router
