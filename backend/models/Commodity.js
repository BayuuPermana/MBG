const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String, // Could be ObjectId ref to User, but spec says "updatedBy" which implies info. Keep simple for now.
        required: false
    }
}, { _id: false });

const commoditySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    history: [historySchema],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

commoditySchema.index({ name: 1, region: 1 }, { unique: true });

module.exports = mongoose.model('Commodity', commoditySchema);
