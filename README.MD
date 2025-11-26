# Berties Books

week 6 labs for Dynamic Web Applications module.

Uses node.js with Express and EJS.

To install and run:

npm install
node index.js

## Access control

- Login required: `/books/addbook`, `/books/bookadded`, `/books/list`, `/logout`.
- Public: home, about, book search/bargain pages, registration, login.

## Validation

- Registration: validates email, username length (5–20), password length (8+); sanitizes first/last name to reduce XSS in echoed messages.
- Other: add more validators where needed following the `express-validator` pattern.

## Sanitization

- `express-sanitizer` middleware enabled globally (`index.js`) so `req.sanitize` is available.
- Registration sanitizes username, email, first, and last name before storing or echoing to mitigate XSS. Passwords are validated for length but not sanitized to preserve intended characters.
- Other forms: add `req.sanitize` and appropriate validators where user-supplied data is stored or rendered.

## Database configuration

- Default DB user: `berties_books_app`
- Default password: `qwertyuiop` (set `DB_PASSWORD` env var to override)
- Sample/test user (inserted via `insert_test_data.sql`): username `gold`, password `smiths`
