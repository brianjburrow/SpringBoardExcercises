-- from the terminal run:
-- psql < craigslist.sql

DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist
-- post

CREATE TABLE posts
(
    post_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    post_title TEXT NOT NULL,
    post_body TEXT NOT NULL,
    latitude DECIMAL,
    longitude DECIMAL
);

-- user

CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    e_mail TEXT NOT NULL,
    preferred_region INTEGER REFERENCES region,
);

-- region

CREATE TABLE regions
(
    region_id SERIAL PRIMARY KEY,
    region_radius DECIMAL NOT NULL,
    region_name TEXT NOT NULL
);

-- categories

CREATE TABLE categories
(
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL,
    category_description TEXT NOT NULL
);

