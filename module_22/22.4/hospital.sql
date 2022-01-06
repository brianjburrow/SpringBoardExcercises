-- from the terminal run:
-- psql < hospital.sql


DROP DATABASE IF EXISTS hospital

CREATE DATABASE hospital 

\c hospital

CREATE TABLE doctors
(
    id SERIAL PRIMARY KEY,
    f_name TEXT NOT NULL,
    l_name TEXT NOT NULL,
    specialty TEXT
)

CREATE TABLE visits
(
    id SERIAL PRIMARY KEY,
    doctor_id INT NOT NULL REFERENCES doctors,
    patient_id INT NOT NULL REFERENCES patients,
    date DATETIME NOT NULL
)
CREATE TABLE patients
(
    id SERIAL PRIMARY KEY,
    f_name TEXT NOT NULL,
    l_name TEXT NOT NULL,
    phone INT,
    insurance TEXT,
    birthday DATE NOT NULL
)

CREATE TABLE diseases
(
    id SERIAL PRIMARY KEY,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    treatment TEXT NOT NULL
)


CREATE TABLE diagnosis
(
    id SERIAL PRIMARY KEY,
    visit_id INT REFERENCES visits,
    disease_id INT REFERENCES diseases,
    notes TEXT NOT NULL
)