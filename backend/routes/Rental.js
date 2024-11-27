const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');  // Assume you have a Rental model

// Get rental history for the user
router.get('/', async (req, res) => {
  try {
    const rentals = await Rental.find({ userId: req.user.id });  // Assuming req.user.id is the user ID
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rental history' });
  }
});

module.exports = router;
