const mongoose = require('mongoose');

const billingRecordSchema = new mongoose.Schema({
  invoiceId: String,
  patientId: String,
  patientName: String,

  medicalServices: [
    {
      name: String,
      price: Number
    }
  ],

  roomType: String,
  roomRate: Number,
  noOfDays: Number,

  medicines: [
    {
      name: String,
      quantity: Number,
      unitPrice: Number,
      total: Number
    }
  ],

  totalAmount: Number,
  amountPaid: Number,
  balanceDue: Number,
  status: {
    type: String,
    enum: ['Unpaid', 'Partial', 'Paid'],
    default: 'Unpaid'
  },

  invoiceDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BillingRecord', billingRecordSchema);
