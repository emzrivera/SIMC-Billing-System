const express = require('express');
const router = express.Router();
const Patient = require('../models/patientModel');

//fetch patient data
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

//add new patient data
router.get('/newpatient', async (req, res) => {
  try {
    const samplePatient = [
      {
        name: "Coco Martin",
        procedures: ["Consultation", "X-ray"],
        services: ["Room 101", "Nursing Service"],
        roomUsage: "5 days"
      },
    ];

    await Patient.insertMany(samplePatient);
    res.status(201).json({ message: 'Sample patient data added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add patient data' });
  }
});

module.exports = router;