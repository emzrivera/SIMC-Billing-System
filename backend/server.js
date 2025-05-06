const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// VALID LOGIN CREDENTIALS
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'secret123';

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
