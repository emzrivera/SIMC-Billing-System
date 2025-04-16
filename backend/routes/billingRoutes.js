const express = require('express');
const router = express.Router();
const Invoice = require('../model/invoice'); // Make sure the path is correct

router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

router.get('/seed', async (req, res) => {
  try {
    const sampleInvoices = [
      {
        patientId: 'P001',
        services: [{ description: 'X-ray', cost: 300 }],
        medications: [{ name: 'Paracetamol', cost: 50 }],
        roomCharges: 500,
        discounts: [{ discountType: 'Senior Citizen', amount: 100 }],
        totalAmount: 750,
        status: 'Pending',
        paymentHistory: [],
      },
    ];

    await Invoice.insertMany(sampleInvoices);
    res.status(201).json({ message: 'Sample invoice seeded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to seed invoice' });
  }
});

module.exports = router;
