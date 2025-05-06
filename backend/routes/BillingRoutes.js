const express = require('express');
const router = express.Router();
const PatientRecord = require('../models/PatientRecordModel');
const MedicineInventory = require('../models/MedicineInvModel');

router.get('/', async (req, res) => {
  try {
    const patients = await PatientRecord.find();
    const results = [];

    for (const patient of patients) {
      const servicePriceMap = {
        'consultation': 500,
        'laboratory': 1000,
        'x-ray': 800,
        'surgery': 5000
      };

      const medicalServices = patient.medicalServices.map(service => {
        const unitPrice = servicePriceMap[service.toLowerCase()] || 0;
        return { name: service, price: unitPrice };
      });

      const serviceTotal = medicalServices.reduce((sum, svc) => sum + svc.price, 0);

      const roomRateMap = {
        'private room': 1500,
        'semi-private': 1000,
        'ward': 500
      };
      const roomRate = roomRateMap[patient.roomType.toLowerCase()] || 0;
      const roomTotal = roomRate * patient.noOfDays;

      let medicineTotal = 0;
      const detailedMeds = [];

      for (const med of patient.medicines) {
        const inventory = await MedicineInventory.findOne({ name: med.name });
        const medPrice = inventory ? inventory.price : 0;
        const total = medPrice * med.quantity;
        medicineTotal += total;

        detailedMeds.push({
          name: med.name,
          quantity: med.quantity,
          unitPrice: medPrice,
          total
        });
      }

      const totalBill = serviceTotal + roomTotal + medicineTotal;

      results.push({
        patientID: patient.patientID,
        patientName: patient.patientName,
        totalBill
      });
    }

    res.json(results);
  } catch (err) {
    console.error('Billing route error:', err);
  }
});

module.exports = router;
