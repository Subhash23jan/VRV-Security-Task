const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please enter the price of the product']
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    venderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter the venderId']
    }
});

module.exports = mongoose.model('Product', productSchema);