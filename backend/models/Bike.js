const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  cc: Number,
  // owner: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imageUrl: String,
  isRented: { type: Boolean, default: false },
  address: String,
  renter: String,  
  rentalInfo: {
    rentStartDate: Date,
    rentEndDate: Date,
    rentalAmount: Number
  }
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
