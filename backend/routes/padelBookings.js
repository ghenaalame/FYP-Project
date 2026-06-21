const router = require('express').Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');

// GET logged-in user's active/upcoming padel bookings
router.get('/my-bookings', auth, async (req, res) => {
    try {
        const user_id = req.user.id;

        const result = await pool.query(
            `SELECT 
                pb.id,
                pb.booking_date,
                pb.start_time,
                pb.end_time,
                pb.total_price,
                pb.status,
                pc.name AS court_name,
                pc.location
             FROM padel_bookings pb
             JOIN padel_courts pc ON pb.court_id = pc.id
             WHERE pb.user_id = $1
             AND pb.status = 'confirmed'
             AND (
                pb.booking_date > CURRENT_DATE
                OR (
                    pb.booking_date = CURRENT_DATE 
                    AND pb.end_time > CURRENT_TIME
                )
             )
             ORDER BY pb.booking_date ASC, pb.start_time ASC`,
            [user_id]
        );

        res.json(result.rows);
    } catch (err) {
        console.error('GET MY PADEL BOOKINGS ERROR:', err);
        res.status(500).json({ message: 'Server error fetching padel bookings' });
    }
});

// GET confirmed bookings for one padel court on one date
router.get('/court/:courtId/date/:bookingDate', async (req, res) => {
    try {
        const { courtId, bookingDate } = req.params;

        const result = await pool.query(
            `SELECT id, booking_date, start_time, end_time, status
             FROM padel_bookings
             WHERE court_id = $1
             AND booking_date = $2::date
             AND status = 'confirmed'
             ORDER BY start_time ASC`,
            [courtId, bookingDate]
        );

        res.json(result.rows);
    } catch (err) {
        console.error('GET PADEL UNAVAILABLE TIMES ERROR:', err);
        res.status(500).json({ message: 'Server error fetching unavailable times' });
    }
});

// POST create padel booking
router.post('/', auth, async (req, res) => {
    try {
        const { court_id, booking_date, start_time, end_time } = req.body;
        const user_id = req.user.id;

        if (!court_id || !booking_date || !start_time || !end_time) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (start_time >= end_time) {
            return res.status(400).json({ message: 'End time must be after start time' });
        }

        // Padel working hours: 10:00 → 22:00
        if (start_time < '10:00' || end_time > '22:00') {
            return res.status(400).json({
                message: 'Padel bookings are only available from 10:00 to 22:00'
            });
        }

        const courtResult = await pool.query(
            'SELECT * FROM padel_courts WHERE id = $1',
            [court_id]
        );

        if (courtResult.rows.length === 0) {
            return res.status(404).json({ message: 'Court not found' });
        }

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

        const start = new Date(`2000-01-01T${start_time}`);
        const end = new Date(`2000-01-01T${end_time}`);
        const durationHours = (end - start) / (1000 * 60 * 60);

        let hourlyRate;

        if (start_time >= '10:00' && start_time < '17:00') {
            hourlyRate = 15;
        } else if (start_time >= '17:00' && start_time < '22:00') {
            hourlyRate = 30;
        } else {
            return res.status(400).json({
                message: 'Invalid booking time'
            });
        }

        const total_price = durationHours * hourlyRate;

        const newBooking = await pool.query(
            `INSERT INTO padel_bookings
             (user_id, court_id, booking_date, start_time, end_time, total_price, status)
             VALUES ($1, $2, $3::date, $4::time, $5::time, $6, 'confirmed')
             RETURNING *`,
            [user_id, court_id, booking_date, start_time, end_time, total_price]
        );

        res.status(201).json({
            message: `Padel booking created successfully. Total price: $${total_price}`,
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

// CANCEL logged-in user's padel booking
router.put('/:id/cancel', auth, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { id } = req.params;

        const result = await pool.query(
            `UPDATE padel_bookings
             SET status = 'cancelled'
             WHERE id = $1 AND user_id = $2
             RETURNING *`,
            [id, user_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Booking not found or not yours' });
        }

        res.json({
            message: 'Padel booking cancelled successfully',
            booking: result.rows[0]
        });
    } catch (err) {
        console.error('CANCEL PADEL BOOKING ERROR:', err);
        res.status(500).json({ message: 'Server error cancelling padel booking' });
    }
});

module.exports = router;