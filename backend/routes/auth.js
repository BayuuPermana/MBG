const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username.toLowerCase(),
            password: hashedPassword,
            role: req.body.role,
            kitchenId: req.body.kitchenId
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        console.log('Login attempt:', req.body.username);
        const user = await User.findOne({ username: req.body.username.toLowerCase() }).populate('kitchenId');
        if (!user) {
            console.log('User not found:', req.body.username);
            return res.status(404).json("User not found");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            console.log('Wrong password for user:', req.body.username);
            return res.status(400).json("Wrong password");
        }

        const accessToken = jwt.sign(
            { id: user._id, role: user.role, kitchenId: user.kitchenId },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: "3d" }
        );

        const { password, ...others } = user._doc;
        console.log('Login success for user:', req.body.username);
        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json(err);
    }
});

// GET ALL USERS
router.get('/', async (req, res) => {
    try {
        const { q, sortBy, order } = req.query;
        let query = {};
        
        if (q) {
            query.username = { $regex: q, $options: 'i' };
        }

        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        const users = await User.find(query)
            .sort(sortOptions)
            .populate('kitchenId', 'name');
            
        const usersList = users.map(user => {
            const { password, ...other } = user._doc;
            return other;
        });
        res.status(200).json(usersList);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE USER
router.put('/:id', async (req, res) => {
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
