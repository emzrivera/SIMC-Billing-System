const express = require('express');
const router = express.Router();
const PatientRecord = require('../models/PatientRecordModel');
const MedicineInventory = require('../models/MedicineInvModel');
const BillingRecord = require('../models/BillingRecordModel');

router.get('/generate', async (req, res) => {
  try {
    const patients = await PatientRecord.find();
    const results = [];
    let counter = 1;

    for (const patient of patients) {
      const servicePriceMap = {
        'consultation': 1000,
        'laboratory': 1000,
        'x-ray': 800,
        'surgery': 50000,
        'ct scan': 3000
      };

      const medicalServices = patient.medicalServices.map(service => {
        const clean = service.toLowerCase().trim();
        const unitPrice = servicePriceMap[clean] || 0;
        return { name: service, price: unitPrice };
      });

      const serviceTotal = medicalServices.reduce((sum, svc) => sum + svc.price, 0);

      const roomRateMap = {
        'vip': 5000,
        'private room': 1000,
        'semi-private': 1000,
        'ward': 500
      };
      const roomRate = roomRateMap[patient.roomType.toLowerCase().trim()] || 0;
      const roomTotal = roomRate * patient.noOfDays;

      let medicineTotal = 0;
      const detailedMeds = [];

      for (const med of patient.medicines) {
        const inventory = await MedicineInventory.findOne({ name: new RegExp(`^${med.name.trim()}$`, 'i') })
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
      const invoiceId = `INV-${String(counter).padStart(4, '0')}`;
      counter++;

      await BillingRecord.findOneAndUpdate(
        { invoiceId },
        {
          invoiceId,
          patientName: patient.patientName,
          patientId: patient.patientID,
          totalAmount: totalBill,
          amountPaid: 0,
          balanceDue: totalBill,
          status: 'Unpaid',
          invoiceDate: new Date()
        },
        { upsert: true, new: true }
      );

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