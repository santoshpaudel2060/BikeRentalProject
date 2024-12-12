
// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     bike: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
//     drivingLicense:{type:Number,required:true},
//     licenseImage:{type:String,required:true},
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     status: { type: String, default: 'Pending' },
// },{
//     timestamps:true
// });

// module.exports = mongoose.model('Booking', bookingSchema);




// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true,
    },
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bike', // Assuming you have a Bike model
      required: true,
    },
    drivingLicense: {
      type: String,
      required: true,
    },
    licenseImage: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Booking', bookingSchema);
