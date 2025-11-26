# Insert data into the tables

USE berties_books;

INSERT INTO books (name, price)VALUES('Brighton Rock', 20.25),('Brave New World', 25.00), ('Animal Farm', 12.99) ;

# Test user for marking
INSERT IGNORE INTO users (username, firstname, lastname, email, hashedPassword)
VALUES ('gold', 'Gold', 'User', 'gold@example.com', '$2b$10$XlHATFwjH0JgQWl13hYD4ezpJaxAYAw93nbVZoUHhprv6p7YUPhjy');
