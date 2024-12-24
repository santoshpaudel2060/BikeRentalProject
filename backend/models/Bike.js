// const mongoose = require('mongoose');

// const bikeSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   cc: Number,
//   // owner: String,
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   imageUrl: String,
//   isRented: { type: Boolean, default: false },
//   address: String,
//   renter: String,
//   rentalInfo: {
//     rentStartDate: Date,
//     rentEndDate: Date,
//     rentalAmount: Number
//   }
// });

// const Bike = mongoose.model('Bike', bikeSchema);

// module.exports = Bike;

const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  isRented: { type: Boolean, default: false },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  cc: { type: Number, required: true },
  rejectionReason: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageUrl: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
