const router = require('express').Router();
const Commodity = require('../models/Commodity');

// GET ALL COMMODITIES
router.get('/', async (req, res) => {
    try {
        const commodities = await Commodity.find();
        res.status(200).json(commodities);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE/CREATE COMMODITY (For Admin/Seed)
router.post('/', async (req, res) => {
    try {
        const commodity = await Commodity.findOneAndUpdate(
            { name: req.body.name },
            req.body,
            { new: true, upsert: true }
        );
        res.status(200).json(commodity);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
