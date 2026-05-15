const router = require('express').Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
    try {
        // Specifically looking at the chalets table
        const result = await pool.query("SELECT * FROM chalets");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Database error fetching Chalets" });
    }
});

// GET a single chalet by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM chalets WHERE id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Chalet not found" });
        }

        res.json(result.rows[0]); // This sends the data to your 'res.data' in React
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;