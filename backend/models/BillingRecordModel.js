const mongoose = require('mongoose');

const billingRecordSchema = new mongoose.Schema({
  invoiceId: { type: String, required: true, unique: true },
  patientName: { type: String, required: true },
  patientId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  amountPaid: { type: Number, default: 0 },
  balanceDue: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Paid', 'Partial', 'Unpaid', 'Voided'],
    default: 'Unpaid'
  },
  invoiceDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BillingRecord', billingRecordSchema);