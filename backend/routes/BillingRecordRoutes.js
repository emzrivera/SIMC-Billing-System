const express = require('express');
const router = express.Router();
const BillingRecord = require('../models/BillingRecordModel');

router.get('/', async (req, res) => {
  try {
    const records = await BillingRecord.find().sort({ invoiceDate: -1 });
    res.json(records);
  } catch (err) {
    console.error('Failed to fetch billing records:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
