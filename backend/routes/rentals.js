// // const express = require("express");
// // const Rental = require("../models/Rental");
// // const Bike = require("../models/Bike");
// // const router = express.Router();

// // // Rent a bike
// // router.post("/rent", async (req, res) => {
// //   const { renterId, bikeId } = req.body;

// //   try {
// //     const rental = await Rental.create({ renter: renterId, bike: bikeId });
// //     await Bike.findByIdAndUpdate(bikeId, { available: false });

// //     res.status(201).json({ message: "Bike rented successfully!", rental });
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to rent the bike" });
// //   }
// // });

// // // Get rental history for a renter
// // router.get("/history/:renterId", async (req, res) => {
// //   const { renterId } = req.params;

// //   try {
// //     const rentals = await Rental.find({ renter: renterId }).populate("bike");
// //     res.status(200).json(rentals);
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to fetch rental history" });
// //   }
// // });

// // // Get rental requests for an owner
// // router.get("/requests/:ownerId", async (req, res) => {
// //   const { ownerId } = req.params;

// //   try {
// //     const requests = await Rental.find()
// //       .populate({
// //         path: "bike",
// //         match: { owner: ownerId },
// //       })
// //       .populate("renter");
// //     res.status(200).json(requests.filter((r) => r.bike !== null));
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to fetch rental requests" });
// //   }
// // });

// // module.exports = router;




// const express = require('express');
// const Rental = require('../models/Rental');
// const router = express.Router();

// // Create a new rental
// // router.post('/', async (req, res) => {
// //   try {
// //     const rental = new Rental(req.body);
// //     const savedRental = await rental.save();
// //     res.status(201).json(savedRental);
// //   } catch (error) {
// //     console.error('Error creating rental:', error);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // });

// router.post('/api/rentals', async (req, res) => {
//   try {
//     const rental = new Rental(req.body); // Create rental document
//     await rental.save(); // Save to database
//     res.status(201).json({ message: 'Rental created successfully!', rental });
//   } catch (error) {
//     console.error('Error creating rental:', error.message);
//     res.status(500).json({ message: 'Error creating rental.', error: error.message });
//   }
// });


// // Get all rentals
// router.get('/', async (req, res) => {
//   try {
//     const rentals = await Rental.find();
//     res.status(200).json(rentals);
//   } catch (error) {
//     console.error('Error fetching rentals:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;







const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');  // Adjust path as necessary

// Example of a route to get rental history for a user
router.get('/', async (req, res) => {
  try {
    // Assuming you're fetching rental history for the logged-in user
    const rentals = await Rental.find({ userId: req.user.id });
    res.json(rentals);  // This ensures JSON is returned
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rental history' });
  }
});

module.exports = router;
