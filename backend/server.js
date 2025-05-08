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

const billingRoutes = require('./routes/BillingRoutes');
app.use('/api/billing', billingRoutes);

const billingRecordRoutes = require('./routes/BillingRecordRoutes');
app.use('/api/billing-records', billingRecordRoutes);

const mockRoutes = require('./routes/mockRoutes');
app.use('/api/mock', mockRoutes);


app.get('/api/inventory', async (req, res) => {
  try {
    const response = await fetch('https://pims-d.onrender.com/inventory');
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Inventory fetch error:', error.message);
    res.status(500).json({ message: 'Failed to fetch inventory', error: error.message });
  }
});

app.get('/api', (req, res) => {
  res.send('API is running...');
});


app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});