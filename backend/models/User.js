const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: 
    { type: Boolean, 
        default: false 
    }, 
    contactNumber: String,
    otp: String,
    otpExpiration: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
