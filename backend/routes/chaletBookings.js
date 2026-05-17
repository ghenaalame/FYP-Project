const router = require('express').Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');

// GET logged-in user's chalet bookings
router.get('/my-bookings', auth, async (req, res) => {
    try {
        const user_id = req.user.id;

        const result = await pool.query(
            `SELECT 
                cb.id,
                cb.check_in_date,
                cb.check_out_date,
                cb.total_nights,
                cb.total_price,
                cb.status,
                c.name AS chalet_name,
                c.location,
                c.chalet_type
             FROM chalet_bookings cb
             JOIN chalets c ON cb.chalet_id = c.id
             WHERE cb.user_id = $1
             ORDER BY cb.check_in_date DESC`,
            [user_id]
        );

        res.json(result.rows);
    } catch (err) {
        console.error('GET MY CHALET BOOKINGS ERROR:', err);
        res.status(500).json({ message: 'Server error fetching chalet bookings' });
    }
});

// POST create chalet booking
router.post('/', auth, async (req, res) => {
    try {
        const { chalet_id, check_in_date, check_out_date } = req.body;
        const user_id = req.user.id;

        if (!chalet_id || !check_in_date || !check_out_date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (check_in_date >= check_out_date) {
            return res.status(400).json({ message: 'Check-out date must be after check-in date' });
        }

        const chaletResult = await pool.query(
            'SELECT * FROM chalets WHERE id = $1',
            [chalet_id]
        );

        if (chaletResult.rows.length === 0) {
            return res.status(404).json({ message: 'Chalet not found' });
        }

        const chalet = chaletResult.rows[0];

        const conflict = await pool.query(
            `SELECT * FROM chalet_bookings
             WHERE chalet_id = $1
             AND status = 'confirmed'
             AND check_in_date < $3::date
             AND check_out_date > $2::date`,
            [chalet_id, check_in_date, check_out_date]
        );

        if (conflict.rows.length > 0) {
            return res.status(409).json({
                message: 'This chalet is already booked during these dates'
            });
        }

        const checkIn = new Date(check_in_date);
        const checkOut = new Date(check_out_date);
        const total_nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

        const total_price = total_nights * Number(chalet.price_per_night);

        const newBooking = await pool.query(
            `INSERT INTO chalet_bookings
             (user_id, chalet_id, check_in_date, check_out_date, total_nights, total_price, status)
             VALUES ($1, $2, $3::date, $4::date, $5, $6, 'confirmed')
             RETURNING *`,
            [user_id, chalet_id, check_in_date, check_out_date, total_nights, total_price]
        );

        res.status(201).json({
            message: 'Chalet booking created successfully',
            booking: newBooking.rows[0]
        });

    } catch (err) {
        console.error('CHALET BOOKING ERROR:', err);
        res.status(500).json({
            message: 'Server error creating chalet booking',
            error: err.message
        });
    }
});

// CANCEL logged-in user's chalet booking
router.put('/:id/cancel', auth, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { id } = req.params;

        const result = await pool.query(
            `UPDATE chalet_bookings
             SET status = 'cancelled'
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Booking not found or not yours' });
        }

        res.json({
            message: 'Chalet booking cancelled successfully',
            booking: result.rows[0]
        });
    } catch (err) {
        console.error('CANCEL CHALET BOOKING ERROR:', err);
        res.status(500).json({ message: 'Server error cancelling chalet booking' });
    }
});

module.exports = router;