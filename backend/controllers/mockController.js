const PatientRecord = require('../models/PatientRecordModel');
const MedicineInventory = require('../models/MedicineInvModel');

exports.addPatient = async (req, res) => {
  try {
    const existing = await PatientRecord.findOne({ patientID: req.body.patientID });
    if (existing) await existing.deleteOne();

    const newPatient = new PatientRecord(req.body);
    await newPatient.save();
    res.status(201).json({ message: 'Patient record saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save patient' });
  }
};

exports.addMedicine = async (req, res) => {
    try {
      const { name, price } = req.body;
      const existing = await MedicineInventory.findOne({ name });
      if (existing) {
        existing.price = price;
        await existing.save();
      } else {
        await MedicineInventory.create({ name, price });
      }
      res.status(201).json({ message: 'Medicine saved/updated' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to save medicine' });
    }
  };
  