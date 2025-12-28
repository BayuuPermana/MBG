const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Database Connection
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.error('MongoDB Connection Error:', err));
}

// Routes
const authRoute = require('./routes/auth');
const kitchenRoute = require('./routes/kitchens');
const reportRoute = require('./routes/reports');
const commodityRoute = require('./routes/commodities');

app.use('/api/auth', authRoute);
app.use('/api/kitchens', kitchenRoute);
app.use('/api/reports', reportRoute);
app.use('/api/commodities', commodityRoute);

app.get('/', (req, res) => {
    res.send('GiziSync API is running...');
});

// Start Server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
