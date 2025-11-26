# Berties Books

Simple Node/Express/EJS app for the DWA labs.

## Run
1) `npm install` (uses `bcryptjs`, no native build needed)
2) Set DB password env var: `DB_PASSWORD=qwertyuiop` (or change in `index.js`)
3) `node index.js` (listens on 8000)

## Database
- Create DB/user: `berties_books_app` / `qwertyuiop`
- Seed: `mysql -u berties_books_app -p < create_db.sql` then `insert_test_data.sql` (adds user `gold` / `smiths`)

## Access
- Login needed: `/books/addbook`, `/books/bookadded`, `/books/list`, `/logout`
- Public: home, about, search, bargain, register, login

## Validation/Safety
- Register: email must be valid; username 4–20; password 6+; input sanitized to reduce XSS
