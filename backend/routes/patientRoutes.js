const express = require('express');
const router = express.Router();
const Patient = require('../models/patientModel'); // adjust path if needed

// Dummy patient data
const patientData = [
  {
    patientId: "001",
    name: "Coco Martin",
    procedures: ["Consultation", "X-ray"],
    services: ["Room 101", "Nursing Service"],
    roomUsage: "5 days"
  },
  {
    patientId: "002",
    name: "Juan Dela Cruz",
    procedures: ["Consultation", "Blood Test"],
    services: ["Room 202", "Nursing Service"],
    roomUsage: "3 days"
  }
];

router.get('/patients', async (req, res) => {
  try {
    const existingPatients = await Patient.find();

    if (existingPatients.length === 0) {
      await Patient.insertMany(patientData);
      console.log('Dummy patient data inserted.');
    }

    const updatedPatients = await Patient.find();
    res.json(updatedPatients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient data' });
  }
});

module.exports = router;
