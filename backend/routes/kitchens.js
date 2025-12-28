const router = require('express').Router();
const Kitchen = require('../models/Kitchen');
const { verifyToken, verifyTokenAndAdmin } = require('../middleware/auth');

// CREATE KITCHEN
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newKitchen = new Kitchen(req.body);
    try {
        const savedKitchen = await newKitchen.save();
        res.status(200).json(savedKitchen);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL KITCHENS
router.get('/', verifyToken, async (req, res) => {
    try {
        const { q, sortBy, order } = req.query;
        let query = {};
        
        if (q) {
            query.$or = [
                { name: { $regex: q, $options: 'i' } },
                { 'location.address': { $regex: q, $options: 'i' } },
                { 'location.city': { $regex: q, $options: 'i' } },
                { 'location.province': { $regex: q, $options: 'i' } }
            ];
        }

        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        const kitchens = await Kitchen.find(query).sort(sortOptions);
        res.status(200).json(kitchens);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE KITCHEN
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Kitchen.findByIdAndDelete(req.params.id);
        res.status(200).json("Kitchen has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE KITCHEN
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedKitchen = await Kitchen.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedKitchen);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
