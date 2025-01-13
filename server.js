const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/racing', require('./routes/racing'));
app.use('/api/action', require('./routes/action'));
app.use('/api/puzzle', require('./routes/puzzle'));
app.use('/api/sports', require('./routes/sports'));
app.use('/api/strategy', require('./routes/strategy'));
app.use('/api/adventure', require('./routes/adventure'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/search', require('./routes/search'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'gamezone'
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});