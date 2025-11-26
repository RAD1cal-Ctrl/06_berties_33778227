# Create database script for Berties books

# Create the database
CREATE DATABASE IF NOT EXISTS berties_books;
USE berties_books;

# Create or refresh the app user (run as MySQL root/admin)
CREATE USER IF NOT EXISTS 'berties_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop';
GRANT ALL PRIVILEGES ON berties_books.* TO 'berties_books_app'@'localhost';
FLUSH PRIVILEGES;

# Create the tables
CREATE TABLE IF NOT EXISTS books (
    id     INT AUTO_INCREMENT,
    name   VARCHAR(50),
    price  DECIMAL(5, 2),
    PRIMARY KEY(id));

# Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id             INT AUTO_INCREMENT,
    username       VARCHAR(50) UNIQUE NOT NULL,
    firstname      VARCHAR(50),
    lastname       VARCHAR(50),
    email          VARCHAR(100),
    hashedPassword VARCHAR(255),
    PRIMARY KEY(id));
