const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: [true,'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    role: {
        type: String,
        required: true,
        default: 'customer'
    }
});

module.exports = mongoose.model('User', userSchema); 