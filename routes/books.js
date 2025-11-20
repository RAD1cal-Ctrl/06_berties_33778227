const express = require("express")
const router = express.Router()

// Search page
router.get('/search', function(req, res, next) {
    res.render("search.ejs")
});

// Search result page
router.get('/search-result', function(req, res, next) {
    res.send("You searched for: " + req.query.keyword)
});

// BOOKS LIST ROUTE — MUST be BEFORE module.exports
router.get('/list', function(req, res, next) {
    let sqlquery = "SELECT * FROM books"; 
    
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
            return
        }
        res.send(result)
    });
});

// Export router LAST
module.exports = router