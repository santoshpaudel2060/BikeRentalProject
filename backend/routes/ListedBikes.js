// // const express = require('express');
// // const router = express.Router();
// // const authMiddleware = require('../middleware/auth');
// // const Bike = require('../models/Bike'); // Assuming Bike is your model
// // const User = require('../models/User'); // Import User model

// // // Fetch bikes listed by the user along with the user's details
// // router.get('/api/listed-bikes', authMiddleware, async (req, res) => {
// //     try {
// //         const userId = req.user.id; // From the JWT token
        
// //         // Fetch the user to get additional user details (optional)
// //         const user = await User.findById(userId);
// //         if (!user) {
// //             return res.status(404).json({ message: 'User not found' });
// //         }

// //         // Fetch bikes listed by this user
// //         const bikes = await Bike.find({ owner: userId });
        
// //         if (!bikes) {
// //             return res.status(404).json({ message: 'No bikes found for this user' });
// //         }

// //         // Optionally, you can send back both user and bikes
// //         res.json({ user, bikes });
// //     } catch (error) {
// //         res.status(500).json({ message: "Error fetching bikes", error });
// //     }
// // });

// // module.exports = router;




// const express = require('express');
// const router = express.Router();
// const Bike = require('../models/Bike');  // Make sure Bike model is imported correctly
// const user = require('../models/User')
// const authMiddleware = require('../middleware/authMiddleware')
// // GET route for fetching all bikes
// // router.get('/listed-bikes', async (req, res) => {
// //   try {
// //     const bikes = await Bike.find();  // Query to get all bikes from database
// //     res.json({ bikes });  // Send bikes as JSON response
// //   } catch (error) {
// //     res.status(500).json({ message: 'Failed to fetch bikes', error: error.message });
// //   }
// // });

// router.get('/api/listed-bikes', authMiddleware, async (req, res) => {
//         try {
//             const userId = req.user.id; // From the JWT token
            
//             // Fetch the user to get additional user details (optional)
//             const user = await User.findById(userId);
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }
    
//             // Fetch bikes listed by this user
//             const bikes = await Bike.find({ owner: userId });
            
//             if (!bikes) {
//                 return res.status(404).json({ message: 'No bikes found for this user' });
//             }
    
//             // Optionally, you can send back both user and bikes
//             res.json({ user, bikes });
//         } catch (error) {
//             res.status(500).json({ message: "Error fetching bikes", error });
//         }
//     });
// module.exports = router;  // Export the router








const express = require('express');
const router = express.Router();
const Bike = require('../models/Bike');

// Get bikes listed by a specific user
router.get('/user-bikes/:username', async (req, res) => {
    try {
        const { username } = req.params; // Get username from URL
        const bikes = await Bike.find({ owner: username }); // Query bikes by owner
        res.status(200).json(bikes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user bikes', error });
    }
});
router.get('/rented-bikes/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const bikes = await Bike.find({ rentedBy: username });
        res.status(200).json(bikes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rented bikes', error });
    }
});

module.exports = router;
