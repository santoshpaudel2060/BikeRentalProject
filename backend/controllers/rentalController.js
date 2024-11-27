const RentalHistory = require('../models/RentalHistory');

const getRentalHistory = async (req, res) => {
  try {
    const rentals = await RentalHistory.find()
      .populate('bike', 'bikeName')  // Assuming you have a 'bikeName' in the Bike schema
      .populate('renter', 'name')   // Assuming 'name' is a field in the User schema
      .exec();
      
    res.status(200).json(rentals);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rental history', error: err });
  }
};

module.exports = { getRentalHistory };
