// Create a new router
const express = require("express")
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10
const { check, validationResult } = require('express-validator')

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

router.post('/registered',
[
    check('email').isEmail().normalizeEmail(),
    check('username').isLength({ min: 5, max: 20 }).trim().escape(),
    check('password').isLength({ min: 8 }),
    check('first').trim().escape(),
    check('last').trim().escape()
],
function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.redirect('./register')
    }

    const safeFirst = req.sanitize(req.body.first || '')
    const safeLast = req.sanitize(req.body.last || '')
    const safeUsername = req.sanitize(req.body.username || '')
    const safeEmail = req.sanitize(req.body.email || '')
    const plainPassword = req.body.password


    bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
        if (err) {
            return next(err)
        }

        const sqlquery = "INSERT INTO users (username, firstname, lastname, email, hashedPassword) VALUES (?, ?, ?, ?, ?)"
        const newrecord = [safeUsername, safeFirst, safeLast, safeEmail, hashedPassword]

        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return next(err)
            }

            let message = ' Hello ' + safeFirst + ' ' + safeLast + ' you are now registered!  We will send an email to you at ' + safeEmail
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
    const cleanUsername = req.sanitize(req.body.username || '')
    const sqlquery = "SELECT hashedPassword FROM users WHERE username = ?"
    db.query(sqlquery, [cleanUsername], (err, result) => {
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
                req.session.userId = cleanUsername
                res.send('Login successful for ' + cleanUsername)
            } else {
                res.send('Login failed: incorrect password')
            }
        })
    })
})

// Export the router object so index.js can access it
module.exports = router
