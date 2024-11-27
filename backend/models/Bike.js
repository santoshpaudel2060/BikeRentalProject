const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  cc: { type: Number, required: true },
  owner: { type: String, required: true },
  imageUrl: { type: String } ,
  rented: { type: Boolean, default: false },
  rentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  rentalDate: { type: Date } 
});

module.exports = mongoose.model('Bike', bikeSchema);
