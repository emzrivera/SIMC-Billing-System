const express = require('express');
const router = express.Router();
const PaymentRecord = require('../models/PaymentRecordModel');
const BillingRecord = require('../models/BillingRecordModel');

router.post('/', async (req, res) => {
    const { invoiceId, amount, method } = req.body;

    try {
        const billing = await BillingRecord.findOne({ invoiceId });
        if (!billing) return res.status(404).json({ message: 'Invoice not found'});

        billing.amountPaid += amount;
        billing.balanceDue = Math.max(billing.totalAmount - billing.discountAmount - billing.amountPaid, 0);
        billing.status = billing.balanceDue === 0 ? 'Paid' : 'Partial';

        const payment = new PaymentRecord({
            invoiceId,
            patientId: billing.patientId,
            patientName: billing.patientName,
            amount,
            method,
            balance: billing.balanceDue,
            paymentDate: new Date()
        });

        await payment.save();
        await billing.save();

        res.status(201).json({ message: 'Payment recorded and invoice updated', payment });
    }
    catch(err) {
        console.error('Failed to record payment:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
  const { patientId } = req.query;
  try {
    const filter = patientId ? { patientId } : {};
    const payments = await PaymentRecord.find(filter).sort({ paymentDate: -1 });
    res.json(payments);
  } catch (err) {
    console.error('Failed to fetch payment history:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:invoiceId', async (req, res) => {
  try {
    const record = await PaymentRecord.findOne({ invoiceId: req.params.invoiceId });
    if (!record) return res.status(404).json({ message: 'Payment not found' });
    res.json(record);
  } catch (err) {
    console.error('Failed to fetch payment by invoice ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;