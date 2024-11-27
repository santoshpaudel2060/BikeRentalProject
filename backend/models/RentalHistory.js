const mongoose = require('mongoose');

const rentalHistorySchema = new mongoose.Schema({
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   // Assuming User model is used for renters
    required: true,
  },
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bike',   // Assuming Bike model is used for the bike being rented
    required: true,
  },
  rentalDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: null,
  },
  rentalStatus: {
    type: String,
    enum: ['rented', 'returned'],
    default: 'rented',
  },
});

const RentalHistory = mongoose.model('RentalHistory', rentalHistorySchema);
module.exports = RentalHistory;
