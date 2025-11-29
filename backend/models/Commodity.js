const mongoose = require('mongoose');

const commoditySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    averagePrice: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Commodity', commoditySchema);
