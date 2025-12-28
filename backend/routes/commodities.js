const router = require('express').Router();
const Commodity = require('../models/Commodity');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/auth');

// GET ALL COMMODITIES
router.get('/', verifyToken, async (req, res) => {
    try {
        const commodities = await Commodity.find();
        res.status(200).json(commodities);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE COMMODITY
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const newCommodity = new Commodity(req.body);
        const savedCommodity = await newCommodity.save();
        res.status(201).json(savedCommodity);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json(err);
        }
        res.status(500).json(err);
    }
});

// DELETE COMMODITY
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Commodity.findByIdAndDelete(req.params.id);
        res.status(200).json("Commodity has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE COMMODITY
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedCommodity = await Commodity.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCommodity);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
