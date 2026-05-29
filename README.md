# FYP Project - Padel Courts & Chalet Reservation System

## Project Overview

This project is a full-stack web application developed for the Final Year Project (FYP).
The system allows users to register, log in, browse padel courts and chalets, and make reservations online.

The application also prevents booking conflicts and provides a responsive modern interface suitable for desktop and mobile devices.

---

# Technologies Used

## Frontend

* React.js
* React Router
* Axios
* CSS (Responsive UI)

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt

## Database

* PostgreSQL

---

# Main Features

## Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Persistent login using localStorage
* Automatic logout on expired token

## Padel Reservation System

* Browse available padel courts
* View court details
* Book available time slots
* Prevent overlapping bookings
* Cancel bookings
* View unavailable booking slots
* Simple café menu section

## Chalet Reservation System

* Browse chalets
* View chalet details
* Book chalets by date
* Prevent overlapping chalet bookings
* Cancel bookings

## Booking Management

* My Bookings page
* View all user reservations
* Cancel active reservations

## UI Features

* Responsive design for phones and desktop
* Modern booking interface
* Dynamic navbar
* Custom chalet and padel pages
* Image-based cards and detail pages

---

# Database Tables

The project database includes:

* users
* padel_courts
* padel_bookings
* chalets
* chalet_bookings

The database schema is included inside:

database.sql

---

# Project Structure

```bash
FYP/
│
├── backend/
│   ├── middleware/
│   ├── routes/
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│
├── database.sql
└── README.md
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/ghenaalame/FYP-Project.git
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 4. Configure Environment Variables

Created a `.env` file inside the backend folder.


---

## 5. Run Backend

```bash
cd backend
node server.js
```

---

## 6. Run Frontend

```bash
cd frontend
npm run dev
```

---

# Future Improvements

Possible future improvements include:

* Admin dashboard
* Booking history filtering
* Online payment integration
* Chalet reviews and ratings
* Padel tournament management

---

# Author

Developed by Ghena Alame and Reem Moselmani
