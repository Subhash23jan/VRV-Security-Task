const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        default: 'admin'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

module.exports = mongoose.model('Admin', adminSchema);