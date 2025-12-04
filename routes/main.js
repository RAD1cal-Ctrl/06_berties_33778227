// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')
const capitals = require('../data/capitals')

const degToCompass = (deg) => {
    if (deg === undefined || deg === null) return null
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    const index = Math.round(deg / 45) % 8
    return directions[index]
}

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

// Simple weather page using OpenWeatherMap
router.get('/weather', function (req, res, next) {
    const rawCity = (req.query.city || 'London,uk').trim()
    const city = req.sanitize ? req.sanitize(rawCity) : rawCity
    const apiKey = process.env.OPENWEATHER_API_KEY || '89e1d4a2ef8fc7135f413e947fea94ce'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) {
            return next(err)
        }

        if (response && response.statusCode >= 400) {
            return res.render('weather.ejs', { city, message: `Error: ${response.statusCode} ${body}`, capitals, weather: null })
        }

        try {
            const weather = JSON.parse(body)

            // Handle "city not found" or missing data safely
            if (!weather || weather.cod === '404' || weather.cod === 404 || !weather.main) {
                return res.render('weather.ejs', { city, message: 'No data found for that location.', capitals, weather: null })
            }

            const weatherData = {
                city: weather.name,
                country: weather.sys ? weather.sys.country : '',
                temp: weather.main ? weather.main.temp : null,
                feelsLike: weather.main ? weather.main.feels_like : null,
                humidity: weather.main ? weather.main.humidity : null,
                pressure: weather.main ? weather.main.pressure : null,
                description: weather.weather && weather.weather[0] ? weather.weather[0].description : '',
                icon: weather.weather && weather.weather[0] ? weather.weather[0].icon : '',
                windSpeed: weather.wind ? weather.wind.speed : null,
                windDeg: weather.wind ? weather.wind.deg : null,
                windDir: degToCompass(weather.wind ? weather.wind.deg : null),
                clouds: weather.clouds ? weather.clouds.all : null
            }
            res.render('weather.ejs', { city, message: null, capitals, weather: weatherData })
        } catch (parseErr) {
            // If parsing fails, show a friendly message instead of crashing
            res.render('weather.ejs', { city, message: 'No data found for that location.', capitals, weather: null })
        }
    })
})

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
