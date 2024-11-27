const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Route to get rental history
router.get('/history', rentalController.getRentalHistory);

module.exports = router;
