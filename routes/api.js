const express = require("express")
const router = express.Router()

// Return all books as JSON, optionally filtered by name search and/or price range
router.get('/books', function (req, res, next) {
    const search = (req.query.search || '').trim()
    const minPriceRaw = req.query.minprice || req.query.min_price
    const maxPriceRaw = req.query.maxprice || req.query.max_price

    const minPrice = minPriceRaw !== undefined ? parseFloat(minPriceRaw) : null
    const maxPrice = maxPriceRaw !== undefined ? parseFloat(maxPriceRaw) : null

    const conditions = []
    const params = []

    if (search.length > 0) {
        conditions.push("name LIKE ?")
        params.push(`%${search}%`)
    }
    if (!Number.isNaN(minPrice) && minPrice !== null) {
        conditions.push("price >= ?")
        params.push(minPrice)
    }
    if (!Number.isNaN(maxPrice) && maxPrice !== null) {
        conditions.push("price <= ?")
        params.push(maxPrice)
    }

    const whereClause = conditions.length ? "WHERE " + conditions.join(" AND ") : ""

    const sortRaw = (req.query.sort || "").toLowerCase()
    const sortColumn = sortRaw === 'price' ? 'price' : 'name'

    const sqlquery = `SELECT * FROM books ${whereClause} ORDER BY ${sortColumn} ASC`

    db.query(sqlquery, params, (err, result) => {
        if (err) {
            return next(err)
        }
        res.json(result)
    })
})

module.exports = router
