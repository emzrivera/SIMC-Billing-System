const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    invoiceId: String,
    patientId: String,
    patientName: String,
    amount: Number,

    method: {
        type: String,
        enum: ['Cash', 'Card'],
        default: 'Cash'
    },
    
    balance: Number,

    paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PaymentRecord', paymentSchema);