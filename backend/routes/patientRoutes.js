const express = require('express');
const router = express.Router();
const Patient = require('../models/patientModel');

router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

router.get('/newpatient', async (req, res) => {
  try {
    const samplePatient = [
      {
        patientId: "001",
        name: "Coco Martin",
        procedures: ["Consultation", "X-ray"],
        services: ["Room 101", "Nursing Service"],
        roomUsage: "5 days"
      },
    ];

    await Patient.insertMany(samplePatient);
    res.status(201).json({ message: 'Sample patient data seeded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to seed patient data' });
  }
});

module.exports = router;