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
// Create a billing record
router.post('/', async (req, res) => {
  try {
    const {
      patientId,
      roomType,
      noOfDays,
      medicalServices,
      medicines,
      hmoInfo: frontendHmoInfo
    } = req.body;

    // fetch patient name from PRMS
    const patientRes = await fetch(`${process.env.PATIENT_API_URL}`);
    const patients = await patientRes.json();
    const patient = patients.find(p => p.patientId === patientId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
    const patientDiscount = patient?.status || 'Regular';

    // fetch pharmacy inventory
    const inventoryRes = await fetch(`${process.env.PHARMACY_API_URL}`);
    const inventory = await inventoryRes.json();

    // service total calculation
    const formattedServices = (medicalServices || []).map(service => {
      const key = service.toLowerCase().trim();
      const price = servicePriceMap[key] || 0;
      return { name: service, price };
    });

    const serviceTotal = formattedServices.reduce((sum, s) => sum + s.price, 0);

    // room total calculation
    const roomRate = roomRateMap[roomType?.toLowerCase().trim()] || 0;
    const roomTotal = roomRate * (noOfDays || 0);

    // medicine total calculation
    let medicineTotal = 0;
    const formattedMeds = (medicines || []).map(med => {
      const found = inventory.find(m => m.name.toLowerCase() === med.name.toLowerCase().trim());
      const unitPrice = found ? found.price : 0;
      const total = unitPrice * (med.quantity || 0);
      medicineTotal += total;
      return {
        name: med.name,
        quantity: med.quantity,
        unitPrice,
        total
      };
    });

    const totalAmount = serviceTotal + roomTotal + medicineTotal;

    const patientStatus = patient?.status || 'Regular';
    const discountRate = (patientStatus === 'Senior' || patientStatus === 'PWD') ? 0.20 : 0;
    const discountAmount = totalAmount * discountRate;
    const afterPatientDiscount = totalAmount - discountAmount;


    let hmoInfo = null;

    if (frontendHmoInfo?.provider && frontendHmoInfo?.percentage) {
      hmoInfo = {
        provider: frontendHmoInfo.provider,
        percentage: frontendHmoInfo.percentage,
        discount: frontendHmoInfo.discount
      };
    }

    const balanceDue = afterPatientDiscount - hmoInfo.discount;

    // generate invoice id
    const counter = await BillingRecord.countDocuments(); 
    const invoiceId = `INV-${String(counter).padStart(4, '0')}`;

    const record = new BillingRecord({
      invoiceId,
      patientId,
      patientName,
      medicalServices: formattedServices,
      roomType,
      roomRate,
      noOfDays,
      medicines: formattedMeds,
      patientDiscount,
      hmoInfo: hmoInfo,
      totalAmount,
      discountAmount,
      amountPaid: 0,
      balanceDue,
      status: 'Unpaid',
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

router.patch('/:invoiceId', async (req, res) => {
  try {
    const updatedInvoice = await BillingRecord.findOneAndUpdate(
      { invoiceId: req.params.invoiceId },
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update invoice status' });
  }
});


module.exports = router;
