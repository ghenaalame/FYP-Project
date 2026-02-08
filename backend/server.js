const express = require('express');
const cors = require('cors');
const pool = require('./config/database'); // Import the pool from your config folder
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000

// 2. Test Route: GET /
app.get('/', (req, res) => {
  res.send('API running');
});

// Example of using the pool in a route
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});