const router = require('express').Router();
const pool = require('../config/database');

// POST create chalet booking
router.post('/', async (req, res) => {
    try {
        const { user_id, chalet_id, check_in_date, check_out_date } = req.body;

        if (!user_id || !chalet_id || !check_in_date || !check_out_date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (check_in_date >= check_out_date) {
            return res.status(400).json({ message: 'Check-out date must be after check-in date' });
        }

        // Check if chalet exists
        const chaletResult = await pool.query(
            'SELECT * FROM chalets WHERE id = $1',
            [chalet_id]
        );

        if (chaletResult.rows.length === 0) {
            return res.status(404).json({ message: 'Chalet not found' });
        }

        const chalet = chaletResult.rows[0];

        // Check overlapping booking for same chalet
        const conflict = await pool.query(
            `SELECT * FROM chalet_bookings
             WHERE chalet_id = $1
             AND status = 'confirmed'
             AND check_in_date < $3
             AND check_out_date > $2`,
            [chalet_id, check_in_date, check_out_date]
        );

        if (conflict.rows.length > 0) {
            return res.status(409).json({ message: 'This chalet is already booked during these dates' });
        }

        // Calculate total nights
        const checkIn = new Date(check_in_date);
        const checkOut = new Date(check_out_date);
        const total_nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

        const total_price = total_nights * Number(chalet.price_per_night);

        // Insert booking
        const newBooking = await pool.query(
            `INSERT INTO chalet_bookings
             (user_id, chalet_id, check_in_date, check_out_date, total_nights, total_price, status)
             VALUES ($1, $2, $3, $4, $5, $6, 'confirmed')
             RETURNING *`,
            [user_id, chalet_id, check_in_date, check_out_date, total_nights, total_price]
        );

        res.status(201).json({
            message: 'Chalet booking created successfully',
            booking: newBooking.rows[0]
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error creating chalet booking' });
    }
});

module.exports = router;