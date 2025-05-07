const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'adminpass';

app.post('/api/auth', (req, res) => {
  const { username, password } = req.body;
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    return res.status(200).json({ message: 'Login successful' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

const billingRoutes = require('./routes/BillingRoutes');
app.use('/api/billing', billingRoutes);

const billingRecordRoutes = require('./routes/BillingRecordRoutes');
app.use('/api/billing-records', billingRecordRoutes);

const mockRoutes = require('./routes/mockRoutes');
app.use('/api/mock', mockRoutes);

app.get('/api', (req, res) => {
  res.send('API is running...');
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});