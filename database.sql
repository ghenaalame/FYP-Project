-- FYP Project Database Schema
-- Padel Courts and Chalets Reservation System

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PADEL COURTS TABLE
-- =========================
CREATE TABLE padel_courts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    price_per_hour NUMERIC NOT NULL
);

-- =========================
-- CHALETS TABLE
-- =========================
CREATE TABLE chalets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    rooms INTEGER NOT NULL,
    has_pool BOOLEAN DEFAULT false,
    price_per_night NUMERIC NOT NULL,
    chalet_type VARCHAR(20) NOT NULL
);

-- =========================
-- PADEL BOOKINGS TABLE
-- =========================
CREATE TABLE padel_bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    court_id INTEGER NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME WITHOUT TIME ZONE NOT NULL,
    end_time TIME WITHOUT TIME ZONE NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'confirmed',

    CONSTRAINT fk_padel_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_padel_court
        FOREIGN KEY (court_id)
        REFERENCES padel_courts(id)
        ON DELETE CASCADE
);

-- =========================
-- CHALET BOOKINGS TABLE
-- =========================
CREATE TABLE chalet_bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    chalet_id INTEGER NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_nights INTEGER NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_chalet_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_chalet
        FOREIGN KEY (chalet_id)
        REFERENCES chalets(id)
        ON DELETE CASCADE
);

-- =========================
-- SAMPLE PADEL COURTS DATA
-- =========================
INSERT INTO padel_courts (name, location, price_per_hour) VALUES
('Padel Pro', 'Court 1', 25.00),
('Padel Pro', 'Court 2', 25.00),
('Padel Pro', 'Court 3', 25.00),
('Padel Pro', 'Court 4', 25.00);

-- =========================
-- SAMPLE CHALETS DATA
-- =========================
INSERT INTO chalets (name, location, rooms, has_pool, price_per_night, chalet_type) VALUES
('Mountain Cozy A', 'Faraya', 2, true, 100, 'normal'),
('Mountain Cozy B', 'Faraya', 2, true, 100, 'normal'),
('Sea Breeze 1', 'Jbeil', 3, false, 120, 'normal'),
('Sea Breeze 2', 'Jbeil', 3, false, 120, 'normal'),
('Elite Villa Alpha', 'Faraya', 5, true, 300, 'pro'),
('Elite Villa Beta', 'Laklouk', 6, true, 350, 'pro'),
('Elite Villa Gamma', 'Cedars', 5, true, 400, 'pro');