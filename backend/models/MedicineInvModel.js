const mongoose = require('mongoose');

const medicineInventorySchema = new mongoose.Schema({
  name: String,
  price: Number
});

module.exports = mongoose.model('MedicineInventory', medicineInventorySchema);
