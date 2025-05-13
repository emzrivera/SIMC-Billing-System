const express = require('express');
const router = express.Router();
const PaymentRecord = require('../models/PaymentRecordModel');
const BillingRecord = require('../models/BillingRecordModel');

router.post('/', async (req, res) => {
    const { invoiceId, amount, method } = req.body;

    try {
        const invoice = await BillingRecord.findOne({ invoiceId });
        if (!invoice) return res.status(404).json({ message: 'Invoice not found'});

        const payment = new PaymentRecord({
            invoiceId,
            patientId: invoice.patientId,
            amount,
            method,
            paymentDate: new Date()
        });
        await payment.save();

        res.status(201).json({ message: 'Payment recorded and invoice updated', payment });
    }
    catch(err) {
        console.error('Failed to record payment:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;