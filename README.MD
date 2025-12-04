# Berties Books

Simple Node/Express/EJS app for the DWA labs.

## Run
1) `npm install` (uses `bcryptjs`, no native build needed)
2) Configure DB creds (overrides available in env):
   - `DB_HOST` (default `localhost`)
   - `DB_USER` (default `berties_books_app`)
   - `DB_PASSWORD` (default `qwertyuiop`)
   - `DB_NAME` (default `berties_books`)
3) `node index.js` (listens on 8000)

## Database
- Create DB/user: run `mysql -u root -p < create_db.sql` (or another admin account). It creates `berties_books` and the `berties_books_app` user with password `qwertyuiop`.
- Seed: `mysql -u berties_books_app -p < insert_test_data.sql` (adds user `gold` / `smiths`)

## Access
- Login needed: `/books/addbook`, `/books/bookadded`, `/books/list`, `/logout`
- Public: home, about, search, bargain, register, login

## Validation/Safety
- Register: email must be valid; username 4–20; password 6+; input sanitized to reduce XSS

## Weather feature notes
- Weather uses OpenWeatherMap; set `OPENWEATHER_API_KEY` if you don't want to rely on the inline demo key.
- Capital dropdown options come from a compiled list of national capitals in `data/capitals.js` (based on publicly available on Wikipedia "List of national capitals").
