const express = require('express');
const router = express.Router();
const BillingRecord = require('../models/BillingRecordModel');
const fetch = require('node-fetch');

// Static maps
const servicePriceMap = {
  'consultation': 1000,
  'x-ray': 800,
  'surgery': 50000,
  'mri': 3000,
  'blood test': 1000
};

const roomRateMap = {
  'vip': 5000,
  'private room': 1000,
  'semi-private': 1000,
  'ward': 500
};

router.get('/', async (req, res) => {
  try {
    const records = await BillingRecord.find().sort({ invoiceDate: -1 });
    res.json(records);
  } catch (err) {
    console.error('Failed to fetch billing records:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a billing record
router.post('/', async (req, res) => {
  try {
    const { patientId, roomType, noOfDays, medicalServices } = req.body;

    // 1. Fetch patient info
    const patientRes = await fetch(process.env.PATIENT_API_URL);
    const patients = await patientRes.json();
    const patient = patients.find(p => p.patientId === patientId);
    if (!patient) return res.status(400).json({ message: 'Invalid patient ID' });

    const patientName = `${patient.firstName} ${patient.lastName}`;
    const patientStatus = patient.status || 'Regular';

    // 2. Fetch inventory
    const inventoryRes = await fetch(process.env.PHARMACY_API_URL);
    const inventory = await inventoryRes.json();

    // 3. Fetch prescriptions
    const presRes = await fetch(process.env.PRESCRIPTION_API_URL);
    const prescriptionData = await presRes.json();
    const prescription = prescriptionData.data?.find(p => p.patientId === patientId);
    const inscription = Array.isArray(prescription?.inscription) ? prescription.inscription : [];

    // 4. Format medicines
    let medicineTotal = 0;
    const formattedMeds = inscription.map(med => {
      const name = med.name?.trim() || 'Unknown';
      const quantity = parseInt(med.quantity) || 0;
      const match = inventory.find(i => i.name.toLowerCase() === name.toLowerCase());
      const unitPrice = match ? match.price : 0;
      const total = unitPrice * quantity;
      medicineTotal += total;
      return { name, quantity, unitPrice, total };
    });

    // 5. Format medical services
    const formattedServices = (medicalServices || []).map(service => {
      const key = service.toLowerCase().trim();
      const price = servicePriceMap[key] || 0;
      return { name: service, price };
    });
    const serviceTotal = formattedServices.reduce((sum, s) => sum + s.price, 0);

    // 6. Room charges
    const roomRate = roomRateMap[roomType?.toLowerCase().trim()] || 0;
    const roomTotal = roomRate * (parseInt(noOfDays) || 0);

    const totalAmount = serviceTotal + roomTotal + medicineTotal;

    // 7. HMO info
    const hmoRes = await fetch(process.env.HMO_API_URL);
    const hmoData = await hmoRes.json();
    const hmoEntry = hmoData.data?.find(card => card.patientId === patientId);
    const hmoProvider = hmoEntry?.healthCardName || 'None';
    const hmoPercentage = hmoEntry?.discount || 0;
    const hmoDiscountAmount = totalAmount * (hmoPercentage / 100);

    // 8. Other discounts
    const discountRate = (patientStatus === 'Senior' || patientStatus === 'PWD') ? 0.20 : 0;
    const discountAmount = totalAmount * discountRate;

    const balanceDue = totalAmount - discountAmount - hmoDiscountAmount;

    // 9. Generate Invoice ID
    const counter = await BillingRecord.countDocuments();
    const invoiceId = `INV-${String(counter).padStart(4, '0')}`;

    // 10. Save to DB
    const record = new BillingRecord({
      invoiceId,
      patientId,
      patientName,
      patientDiscount: patientStatus,
      medicalServices: formattedServices,
      roomType,
      roomRate,
      noOfDays,
      medicines: formattedMeds,
      totalAmount,
      discountAmount,
      amountPaid: 0,
      balanceDue,
      status: 'Unpaid',
      hmoInfo: hmoProvider === 'None' ? [] : [{
        provider: hmoProvider,
        percentage: hmoPercentage,
        discount: hmoDiscountAmount
      }],
      invoiceDate: new Date()
    });

    await record.save();
    res.status(201).json({ message: 'Invoice created successfully', invoiceId });
  } catch (err) {
    console.error('Failed to create invoice:', err);
    res.status(500).json({ message: 'Server error during invoice creation' });
  }
});

router.get('/:invoiceId', async (req, res) => {
  try {
    const record = await BillingRecord.findOne({ invoiceId: req.params.invoiceId });
    if (!record) return res.status(404).json({ message: 'Invoice not found' });
    res.json(record);
  } catch (err) {
    console.error('Failed to fetch invoice details:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
