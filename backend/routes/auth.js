



const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { forgotPassword, resetPassword } = require('../controllers/authController');



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
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, 
                role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',  // Ensure you set this in your environment variables
            { expiresIn: '1h' }
        );

        res.status(200).json({ token,email:email ,userId:user._id});
         // Respond with the token
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});





// Forgot Password
router.post('/forgot-password', forgotPassword);

// // Reset Password
// router.post('/reset-password', resetPassword);




module.exports = router;
