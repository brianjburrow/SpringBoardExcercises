-- from the terminal run:
-- psql < league.sql

DROP DATABASE IF EXISTS league;

CREATE DATABASE league;


\c league

CREATE TABLE teams(
    team_id SERIAL PRIMARY KEY,
    stadium TEXT NOT NULL,
    coach INTEGER NOT NULL REFERENCES players,
);

CREATE TABLE goals(
    goal_id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES players,
    match_id INTEGER REFERENCES matches,
    time_in_game DECIMAL NOT NULL,
    goal_tender_id INTEGER REFERENCES players
);

CREATE TABLE matches(
    match_id SERIAL PRIMARY KEY,
    home_team_id INTEGER REFERENCES teams,
    away_team_id INTEGER REFERENCES teams,
    home_score INTEGER,
    away_score INTEGER,
    head_ref INTEGER REFERENCES referees,
    ref_2 INTEGER REFERENCES referees,
    ref_3 INTEGER REFERENCES referees,
    season_id INTEGER REFERENCES league
);

CREATE TABLE referees(
    ref_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    years_active INTEGER NOT NULL
);

CREATE TABLE players(
    player_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    team_id INTEGER REFERENCES teams
)

CREATE TABLE league(
    league_id SERIAL PRIMARY KEY,
    season_start_date DATE,
    season_end_date DATE
);


CREATE TABLE league_player(
    id SERIAL PRIMARY KEY,
    player_id INT REFERENCES players,
    league_Id INT REFERENCES league
)