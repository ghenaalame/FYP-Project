const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

app.post('/api/register', async (req,res)=>{
  const { name, email , password } =req.body;
  
  try{
    // generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // save to postgres
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
  }catch(err){
    console.error(err.message);
    res.status(500).json({ message: 'Registration failed' });
  }
});

app.post('/api/login', async (req,res)=>{
  const { email , password } =req.body;
  try{
    // find the user
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if(user.rows.length === 0) return res.status(400).json({"Invalid Credentials": "User not found"});
    
    // compare the password (baad ma le2e le user baaml compare ll password)
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if(!validPassword) return res.status(400).json({"Invalid Credentials": "Wrong password"});

    // create a jwt token (The VIP pass)
    // Authorization (The VIP Pass)
    // Step 3 (jwt.sign): Once the user is verified, the server doesn't want to check their
    //  password every time they click a button. So, it creates a JWT (JSON Web Token).
    // This token is like a stamped hand at a club. For the next hour (expiresIn: '1h'), 
    // the user just shows this token to the server to prove they are already logged in.
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  }catch(err){
    res.status(500).json({ message: 'Login failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





