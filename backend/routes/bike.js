

const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Bike = require('../models/Bike');
const mongoose = require('mongoose')
const router = express.Router();


const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filenames
  }
});

const upload = multer({ storage });


router.use('/uploads', express.static(uploadDir));


router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, price, cc, owner } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !description || !price || !cc || !owner) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }
console.log(imageUrl);

  const newBike = new Bike({
    title,
    description,
    price,
    cc,
    owner,
    imageUrl
  });

  try {
    const savedBike = await newBike.save();
    res.status(201).json(savedBike);
  } catch (error) {
    console.error('Error saving bike:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/', async (req, res) => {
  try {
    let  { userId: excludeUserId, owner: ownerId } = req.query;

    // Check if userId and owner are not equal to "null"
    if (excludeUserId === 'null') {
      excludeUserId = null;
    }
    if (ownerId === 'null') {
      ownerId = null;
    }

    // Create a filter object with optional conditions
    const filter = {
      $or: [
        ...(ownerId ? [{ owner: ownerId }] : []),
        ...(excludeUserId ? [{ owner: { $ne: excludeUserId } }] : []),
      ],
    };

    // Remove empty objects from the filter
    filter.$or = filter.$or.filter((obj) => Object.keys(obj).length > 0);

    // If filter.$or is empty, remove it from the filter
    if (filter.$or.length === 0) {
      delete filter.$or;
    }

    // Fetch bikes based on the filter
    const bikes = await Bike.find(filter).populate({
      path: 'owner',
      select: '-password'
    }); // i dont want to select owner's password 



    res.json(bikes);
  } catch (error) {
    console.error('Error fetching bikes:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});


module.exports = router;
