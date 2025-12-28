const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const resetAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to:', process.env.MONGO_URI);

        const user = await User.findOne({ username: 'admin' });
        if (user) {
            console.log('Existing Admin found:', user.username);
            console.log('Role:', user.role);
        } else {
            console.log('Admin user not found.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const result = await User.findOneAndUpdate(
            { username: 'admin' },
            { 
                password: hashedPassword,
                role: 'admin' // Force role to admin
            },
            { new: true, upsert: true }
        );

        console.log('Admin user updated/created.');
        console.log('Password set to: admin123');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

resetAdmin();
