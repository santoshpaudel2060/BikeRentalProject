const Bike = require('../models/Bike');

const getPendingBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ status: 'pending' }).populate('owner', 'name email');
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending bikes', error: error.message });
  }
};

const updateBikeStatus = async (req, res) => {
  const { bikeId, status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const bike = await Bike.findById(bikeId);

    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }

    bike.status = status;
    await bike.save();

    res.status(200).json({ message: `Bike ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating bike status', error: error.message });
  }
};

module.exports = { getPendingBikes, updateBikeStatus };
