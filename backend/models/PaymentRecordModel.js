const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    invoiceId: String,
    patientId: String,
    amount: Number,

    method: {
        type: String,
        enum: ['Cash', 'Card'],
        default: 'Cash'
    },

    paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PaymentRecord', paymentSchema);