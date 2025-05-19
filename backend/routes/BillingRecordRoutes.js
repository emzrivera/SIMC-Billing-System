const express = require('express');
const router = express.Router();
const BillingRecord = require('../models/BillingRecordModel');
const fetch = require('node-fetch');

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

// Get all billing records
router.get('/', async (req, res) => {
  try {
    const records = await BillingRecord.find().sort({ invoiceDate: -1 });
    res.json(records);
  } catch (err) {
    console.error('Failed to fetch billing records:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new billing record
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

    // Fetch patient info
    const patientRes = await fetch(`${process.env.PATIENT_API_URL}`);
    const patients = await patientRes.json();
    const patient = patients.find(p => p.patientId === patientId);
    const patientName = patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
    const patientStatus = patient?.status || 'Regular';
    const patientDiscount = patientStatus;

    // Fetch medicine prices
    const inventoryRes = await fetch(`${process.env.PHARMACY_API_URL}`);
    const inventory = await inventoryRes.json();

    // Medical services
    const formattedServices = (medicalServices || []).map(service => {
      const key = service.toLowerCase().trim();
      const price = servicePriceMap[key] || 0;
      return { name: service, price };
    });
    const serviceTotal = formattedServices.reduce((sum, s) => sum + s.price, 0);

    // Room
    const roomRate = roomRateMap[roomType?.toLowerCase().trim()] || 0;
    const roomTotal = roomRate * (noOfDays || 0);

    // Medicines
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

    // Patient discount
    const discountRate = (patientStatus === 'Senior' || patientStatus === 'PWD') ? 0.20 : 0;
    const discountAmount = totalAmount * discountRate;
    const afterPatientDiscount = totalAmount - discountAmount;

    // HMO discount
    let hmoDiscount = 0;
    let hmoInfo = null;

    if (frontendHmoInfo?.provider && frontendHmoInfo?.percentage) {
      const percentage = Number(frontendHmoInfo.percentage);
      hmoDiscount = afterPatientDiscount * (percentage / 100);
      hmoInfo = {
        provider: frontendHmoInfo.provider,
        percentage,
        discount: hmoDiscount
      };
    }

    // Final balance
    const balanceDue = afterPatientDiscount - hmoDiscount;

    // Generate invoice ID
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
      hmoInfo,
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

// Get invoice by ID
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

// Update invoice (e.g., voiding)
router.patch('/:invoiceId', async (req, res) => {
  try {
    const updateFields = req.body;
    const updatedInvoice = await BillingRecord.findOneAndUpdate(
      { invoiceId: req.params.invoiceId },
      updateFields,
      { new: true }
    );
    res.json(updatedInvoice);
  } catch (error) {
    console.error('Failed to update invoice:', error);
    res.status(500).json({ error: 'Failed to update invoice' });
  }
});

// PATCH route to update invoice
router.patch('/:id', async (req, res) => {
  try {
    const { hmoInfo, discountAmount, totalAmount, amountPaid } = req.body;
    
    // Log the received data to check if it's correct
    console.log('PATCH Request Body:', req.body);

    // Calculate HMO discount and new balanceDue here
    const afterPatientDiscount = totalAmount - discountAmount;
    const hmoDiscount = hmoInfo?.discount || 0;
    const newBalanceDue = afterPatientDiscount - hmoDiscount - amountPaid;

    let status = 'Unpaid';
    if (balanceDue <= 0) {
      status = 'Paid';
    } else if (balanceDue < totalAmount) {
      status = 'Partial';
    }

    // Update the record with the new balanceDue and hmoInfo
    const updatedInvoice = await BillingRecord.findOneAndUpdate(
      { invoiceId: req.params.invoiceId },
      {
        $set: {
          hmoInfo,
          totalAmount,
          discountAmount,
          amountPaid,
          balanceDue: newBalanceDue,
          status
        }
      },
      { new: true }
    );

    if (updatedInvoice) {
      console.log('Updated Invoice:', updatedInvoice); // Log to confirm update
      return res.status(200).json(updatedInvoice);
    } else {
      return res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (err) {
    console.error('Error updating invoice:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
