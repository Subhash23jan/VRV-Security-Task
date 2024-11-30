const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
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
        default: 'vender'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    }]
});

module.exports = mongoose.model('Vender', vendorSchema);