const express = require('express');
const router = express.Router();
const { addPatient, addMedicine } = require('../controllers/mockController');

router.post('/patient', addPatient);
router.post('/medicine', addMedicine);

module.exports = router;