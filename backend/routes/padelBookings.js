const router = require('express').Router();
const pool = require('../config/database');

// POST create padel booking
router.post('/', async (req, res) => {
    try {
        const { user_id, court_id, booking_date, start_time, end_time } = req.body;

        if (!user_id || !court_id || !booking_date || !start_time || !end_time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (start_time >= end_time) {
            return res.status(400).json({ message: 'End time must be after start time' });
        }

        // Check if court exists
        const courtResult = await pool.query(
            'SELECT * FROM padel_courts WHERE id = $1',
            [court_id]
        );

        if (courtResult.rows.length === 0) {
            return res.status(404).json({ message: 'Court not found' });
        }

        const court = courtResult.rows[0];

        // Check overlapping booking for same court and same date
        const conflict = await pool.query(
            `SELECT * FROM padel_bookings
             WHERE court_id = $1
             AND booking_date = $2::date
             AND status = 'confirmed'
             AND start_time < $4::time
             AND end_time > $3::time`,
            [court_id, booking_date, start_time, end_time]
        );

        if (conflict.rows.length > 0) {
            return res.status(409).json({
                message: 'This court is already booked during this time'
            });
        }

        // Calculate duration in hours
        const start = new Date(`2000-01-01T${start_time}`);
        const end = new Date(`2000-01-01T${end_time}`);
        const durationHours = (end - start) / (1000 * 60 * 60);

        const total_price = durationHours * Number(court.price_per_hour);

        // Insert booking
        const newBooking = await pool.query(
            `INSERT INTO padel_bookings
             (user_id, court_id, booking_date, start_time, end_time, total_price, status)
             VALUES ($1, $2, $3::date, $4::time, $5::time, $6, 'confirmed')
             RETURNING *`,
            [user_id, court_id, booking_date, start_time, end_time, total_price]
        );

        res.status(201).json({
            message: 'Padel booking created successfully',
            booking: newBooking.rows[0]
        });

    } catch (err) {
        console.error('PADEL BOOKING ERROR:', err);
        res.status(500).json({
            message: 'Server error creating padel booking',
            error: err.message
        });
    }
});

module.exports = router;