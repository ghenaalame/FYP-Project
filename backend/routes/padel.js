const router = require('express').Router();
const pool = require('../config/database');

router.get('/',async (req , res)=> {
    try{
        const courts = await pool.query("SELECT * FROM padel_courts");
        res.json(courts.rows);
    }catch(err){
        res.status(500).json({ error: "Database error fetching Padel courts" });
    }
});

// Get ONE specific court by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const court = await pool.query("SELECT * FROM padel_courts WHERE id = $1", [id]);
        
        if (court.rows.length === 0) {
            return res.status(404).json({ message: "Court not found" });
        }
        
        res.json(court.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;