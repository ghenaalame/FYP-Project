const router = require('express').Router();
const pool = require('../config/database');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET all padel bookings for admin
router.get('/padel-bookings', auth, admin, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                pb.id,
                pb.booking_date,
                pb.start_time,
                pb.end_time,
                pb.total_price,
                pb.status,
                pb.created_at,
                u.name AS user_name,
                u.email AS user_email,
                pc.name AS court_name,
                pc.location AS court_location
             FROM padel_bookings pb
             JOIN users u ON pb.user_id = u.id
             JOIN padel_courts pc ON pb.court_id = pc.id
             ORDER BY pb.booking_date DESC, pb.start_time DESC`
        );

        res.json(result.rows);
    } catch (err) {
        console.error('ADMIN PADEL BOOKINGS ERROR:', err);
        res.status(500).json({ message: 'Server error fetching padel bookings' });
    }
});

// GET all chalet bookings for admin
router.get('/chalet-bookings', auth, admin, async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
                cb.id,
                cb.check_in_date,
                cb.check_out_date,
                cb.total_nights,
                cb.total_price,
                cb.status,
                cb.created_at,
                u.name AS user_name,
                u.email AS user_email,
                c.name AS chalet_name,
                c.location AS chalet_location,
                c.chalet_type
             FROM chalet_bookings cb
             JOIN users u ON cb.user_id = u.id
             JOIN chalets c ON cb.chalet_id = c.id
             ORDER BY cb.check_in_date DESC`
        );

        res.json(result.rows);
    } catch (err) {
        console.error('ADMIN CHALET BOOKINGS ERROR:', err);
        res.status(500).json({ message: 'Server error fetching chalet bookings' });
    }
});

module.exports = router;