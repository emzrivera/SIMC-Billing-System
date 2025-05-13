const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const fetch = require('node-fetch'); 
const path = require('path');

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

const billingRecordRoutes = require('./routes/BillingRecordRoutes');
app.use('/api/billing-records', billingRecordRoutes);

const paymentRecordRoutes = require('./routes/PaymentRecordRoute');
app.use('/api/payment-records', paymentRecordRoutes);

app.get('/api', (req, res) => {
  res.send('API is running...');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});