# Create database script for Berties books

# Create the database
CREATE DATABASE IF NOT EXISTS berties_books;
USE berties_books;

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
