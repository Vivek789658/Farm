const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    cropId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    matchedProduct: {
        title: String,
        price: String,
        image: String,
        buyLink: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Crop', cropSchema); 