const mongoose = require('mongoose');

const patientRecordSchema = new mongoose.Schema({
  patientID: String,
  patientName: String,
  medicalServices: [String],
  roomType: String,
  noOfDays: Number,
  medicines: [
    {
      name: String,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model('PatientRecord', patientRecordSchema);
