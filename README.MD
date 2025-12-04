# Berties Books

Small Node/Express/EJS site for the labs.

## Run it
1) `npm install`
2) DB settings (env vars, defaults in brackets):
   - `DB_HOST` (`localhost`)
   - `DB_USER` (`berties_books_app`)
   - `DB_PASSWORD` (`qwertyuiop`)
   - `DB_NAME` (`berties_books`)
3) `node index.js` (port 8000)

## Database setup
- Make DB/user: `mysql -u root -p < create_db.sql` (or use another admin account). Creates DB and user `berties_books_app` with password `qwertyuiop`.
- Add sample data: `mysql -u berties_books_app -p < insert_test_data.sql` (user `gold` / `smiths`).

## Pages
- Login required: `/books/addbook`, `/books/bookadded`, `/books/list`, `/logout`
- Public: home, about, search, bargain, register, login
- Quick links when running locally on port 8000:
  - Home: `http://localhost:8000/`
  - About: `http://localhost:8000/about`
  - Search: `http://localhost:8000/books/search`
  - Bargain: `http://localhost:8000/books/bargainbooks`
  - Weather: `http://localhost:8000/weather`

## Validation
- Register form: email must be valid; username 4–20 chars; password 6+; inputs are sanitized.

## Weather
- Uses OpenWeatherMap; set `OPENWEATHER_API_KEY` to avoid the inline demo key.
- Capital dropdown list lives in `data/capitals.js` (taken from the Wikipedia “List of national capitals”).

## API
- Base: `/api`
- `GET /api/books` → all books as JSON
  - `search` (optional) filter by name
  - `minprice` / `min_price` (optional) minimum price
  - `maxprice` / `max_price` (optional) maximum price
  - `sort` (optional) `name` (default) or `price`
