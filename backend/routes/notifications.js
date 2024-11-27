// Backend: routes/notifications.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Assuming User model

// Get notifications for a specific user
router.get('/notifications/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user.notifications);  // Assuming notifications are in the 'notifications' field
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

module.exports = router;
