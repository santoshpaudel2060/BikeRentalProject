const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idNumber: { type: String, required: true },
  driverLicense: { type: String, required: true },
  addressProof: { type: String, required: true },
  creditCard: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  bikeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
  bikeOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agreementSigned: { type: Boolean, required: true },
});

module.exports = mongoose.model('Rental', rentalSchema);
