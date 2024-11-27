// backend/routes/bike.js
const multer = require('multer');
const path = require('path');
const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify the folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // create unique file names
  }
});

const upload = multer({ storage: storage });

// Add a new bike with image upload
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, price, cc, owner } = req.body;
  const imageUrl = req.file ? req.file.path : null; // store the image path if a file is uploaded

  const newBike = new Bike({
    title,
    description,
    price,
    cc,
    owner,
    imageUrl // store the image URL
  });

  try {
    const savedBike = await newBike.save();
    res.status(201).json(savedBike);
  } catch (error) {
    res.status(400).json({ message: 'Error adding bike' });
  }
});

// API Route for getting bikes
router.get('/', async (req, res) => {
  try {
    const bikes = await Bike.find(); // Fetch bikes from MongoDB
    res.json(bikes); // Return bikes as JSON
  } catch (error) {
    console.error('Error fetching bikes:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


module.exports = router;
