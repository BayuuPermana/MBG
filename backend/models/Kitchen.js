const mongoose = require('mongoose');

const kitchenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        address: String,
        city: String,
        province: String
    },
    capacity: {
        type: Number, // Number of meals per day
        default: 0
    },
    operatorName: String,
    contactNumber: String
}, { timestamps: true });

module.exports = mongoose.model('Kitchen', kitchenSchema);
