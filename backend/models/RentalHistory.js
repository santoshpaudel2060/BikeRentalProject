// const mongoose = require('mongoose');

// const rentalHistorySchema = new mongoose.Schema({
//   renter: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',   // Assuming User model is used for renters
//     required: true,
//   },
//   bike: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Bike',   // Assuming Bike model is used for the bike being rented
//     required: true,
//   },
//   rentalDate: {
//     type: Date,
//     default: Date.now,
//   },
//   returnDate: {
//     type: Date,
//     default: null,
//   },
//   rentalStatus: {
//     type: String,
//     enum: ['rented', 'returned'],
//     default: 'rented',
//   },
// });

// const RentalHistory = mongoose.model('RentalHistory', rentalHistorySchema);
// module.exports = RentalHistory;




const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Rental Schema
const bikeRentalSchema = new Schema({
  // Reference to the User who is renting the bike
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Ensure a user is always provided
  },
  // Reference to the Bike being rented
  bike: {
    type: Schema.Types.ObjectId,
    ref: 'Bike',
    required: true, // Ensure a bike is always selected
  },
  // Driving License Number (a text field)
  drivingLicense: {
    type: String,
    required: true, // Ensure this field is provided
  },
  // Image URL of the driving license
  licenseImage: {
    type: String,
    required: true, // Ensure the image URL is always provided
  },
  // Rental Start Date
  startDate: {
    type: Date,
    required: true, // This must be a valid date
  },
  // Rental End Date
  endDate: {
    type: Date,
    required: true, // This must be a valid date
  },
  // Status of the rental, e.g., Pending, Approved, Returned
  rentalStatus: {
    type: String,
    default: 'Pending', // Default status is Pending
    enum: ['Pending', 'Approved', 'Returned'],
  },
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create a model for the bike rental
const BikeRental = mongoose.model('BikeRental', bikeRentalSchema);

module.exports = BikeRental;
