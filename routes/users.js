// Create a new router
const express = require("express")
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('./login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}


router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

router.post('/registered', function (req, res, next) {
    const plainPassword = req.body.password

    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        if (err) {
            return next(err)
        }

        const sqlquery = "INSERT INTO users (username, firstname, lastname, email, hashedPassword) VALUES (?, ?, ?, ?, ?)"
        const newrecord = [req.body.username, req.body.first, req.body.last, req.body.email, hashedPassword]

        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return next(err)
            }

            let message = ' Hello ' + req.body.first + ' ' + req.body.last + ' you are now registered!  We will send an email to you at ' + req.body.email
            message += '<br>Your password is: ' + plainPassword + ' and your hashed password is: ' + hashedPassword
            res.send(message)
        })
    })
}); 

// List users page (requires login)
router.get('/list', redirectLogin, function (req, res, next) {
    const sqlquery = "SELECT username, firstname, lastname, email FROM users"
    db.query(sqlquery, (err, result) => {
        if (err) {
            return next(err)
        }
        res.render("listusers.ejs", { users: result })
    })
})

// Login form
router.get('/login', function (req, res, next) {
    res.render('login.ejs')
})

// Login handler
router.post('/loggedin', function (req, res, next) {
    const sqlquery = "SELECT hashedPassword FROM users WHERE username = ?"
    db.query(sqlquery, [req.body.username], (err, result) => {
        if (err) {
            return next(err)
        }
        if (result.length === 0) {
            return res.send('Login failed: user not found')
        }

        const hashedPassword = result[0].hashedPassword

        bcrypt.compare(req.body.password, hashedPassword, function (err, match) {
            if (err) {
                return next(err)
            } else if (match == true) {
                req.session.userId = req.body.username
                res.send('Login successful for ' + req.body.username)
            } else {
                res.send('Login failed: incorrect password')
            }
        })
    })
})

// Export the router object so index.js can access it
module.exports = router
