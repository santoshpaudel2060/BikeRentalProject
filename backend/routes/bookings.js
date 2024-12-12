



// routes/Booking.js
const express = require('express');
const mongoose = require('mongoose');
const BookingModel = require('../models/Booking');

const router = express.Router();

// Route to create a new booking
// router.post("/create", async (req, res) => {
//   // console.log("Booking Request:", req.body);

//   try {
//     // Create a new booking with the data sent in the request body
//     const newBooking = await BookingModel.create(req.body);
    
//     // Return a success message and the created booking
//     return res.status(201).json({
//       message: "Bike booked successfully",
//       booking: newBooking
//     });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     return res.status(500).json({ message: "Failed to book bike", error: error.message });
//   }
// });

// router.post("/create", async (req, res) => {
//   try {
//     const { user, bike, ...rest } = req.body;

//     // Validate user and bike IDs
//     if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(bike)) {
//       return res.status(400).json({ message: "Invalid user or bike ID" });
//     }

//     // Convert to ObjectId
//     const newBooking = await BookingModel.create({
//       ...rest,
//       user: new mongoose.Types.ObjectId(user),
//       bike: new mongoose.Types.ObjectId(bike),
//     });

//     // Return success response
//     return res.status(201).json({
//       message: "Bike booked successfully",
//       booking: newBooking
//     });
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     return res.status(500).json({ message: "Failed to book bike", error: error.message });
//   }
// });

router.post("/create", async (req, res) => {
  try {
    const { user, bike, ...rest } = req.body;

    // Validate user and bike IDs
    if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(bike)) {
      return res.status(400).json({ message: "Invalid user or bike ID" });
    }

    // Check if the bike exists and retrieve its owner
    const bikeDetails = await BikeModel.findById(bike);
    if (!bikeDetails) {
      return res.status(404).json({ message: "Bike not found" });
    }

    // Prevent the owner of the bike from renting it
    if (bikeDetails.owner.toString() === user) {
      return res.status(400).json({ message: "You cannot rent your own bike" });
    }

    // Create a new booking
    const newBooking = await BookingModel.create({
      ...rest,
      user: new mongoose.Types.ObjectId(user),
      bike: new mongoose.Types.ObjectId(bike),
    });

    // Return success response
    return res.status(201).json({
      message: "Bike booked successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Failed to book bike", error: error.message });
  }
});



// Get bookings for a specific user
router.get("/mybookings", async (req, res) => {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    try {
      // Convert userId to ObjectId using the correct method
      const matchQuery = { user: new mongoose.Types.ObjectId(userId) };
  
      const pipeline = [
        { $match: matchQuery },
        {
          $lookup: {
            from: "bikes", // Assuming your bikes collection is named "bikes"
            localField: "bike", // This is where the `bikeId` is stored in booking
            foreignField: "_id",
            as: "bikeDetails",
          },
        },
        { $unwind: "$bikeDetails" }, // Unwind to flatten the bikeDetails array
        { $sort: { createdAt: -1 } },
      ];
  
      const myBookings = await BookingModel.aggregate(pipeline);
  
      return res.status(200).json({
        data: myBookings,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
    }
  });

module.exports = router;
