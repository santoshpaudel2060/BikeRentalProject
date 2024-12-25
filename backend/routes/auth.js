



const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controllers/authController');
const { Admin } = require('mongodb');



router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
      
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = new User({ name, email, password: hashedPassword });

       
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




// User Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if email and password are provided
//         if (!email || !password) {
//             return res.status(400).json({ message: "Please provide both email and password" });
//         }

//         // Find the user by email
//         const user = await User.findOne({ email });
      

//         // Compare the provided password with the hashed password in the database
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // Generate a JWT token
//         const token = jwt.sign(
//             { id: user._id, 
//                 role: user.role },
//             process.env.JWT_SECRET || 'your_jwt_secret',  // Ensure you set this in your environment variables
//             { expiresIn: '1h' }
//         );

//         res.status(200).json({ token,email:email ,userId:user._id ,admin:user.admin ,userName:user.name});
//          // Respond with the token
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error logging in', error: error.message });
//     }
    
 
// });



router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate email and password presence
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret', // Use a secret key from env variables
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Respond with token and user details
        res.status(200).json({
            message: "Login successful.",
            token,
            email: user.email,
            userId: user._id,
            admin: user.admin || false,
            userName: user.name || "Guest",
        });
    } catch (error) {
        // Log error for debugging purposes
        console.error("Error logging in:", error.message);

        // Respond with a generic error message
        res.status(500).json({ message: "An error occurred during login.", error: error.message });
    }
});


// Forgot Password
router.post('/forgot-password', forgotPassword);

// // Reset Password
// router.post('/reset-password', resetPassword);




module.exports = router;
