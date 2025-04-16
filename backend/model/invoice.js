const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  patientId: String,
  services: [{ description: String, cost: Number }],
  medications: [{ name: String, cost: Number }],
  roomCharges: Number,
  discounts: [{
    discountType: String,  // renamed from `type` to avoid Mongoose conflict
    amount: Number
  }],
  totalAmount: Number,
  status: { type: String, enum: ['Pending', 'Partial', 'Paid'], default: 'Pending' },
  paymentHistory: [{ date: Date, amount: Number, method: String }],
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
