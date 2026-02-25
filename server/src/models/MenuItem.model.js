const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a menu item name'],
        trim: true
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    imageUrl: {
        type: String,
        default: 'no-photo.jpg'
    },
    portionSize: {
        type: String,
        required: [true, 'Please add a portion size']
    },
    availability: {
        type: String,
        enum: ['AVAILABLE', 'OUT_OF_STOCK'],
        default: 'AVAILABLE'
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
