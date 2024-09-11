const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const gymRoutes = require('./routers/gymRoutes');
const memberRoutes = require('./routers/memberRoutes');

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/gym_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

// Use routes
app.use('/33120102/gyms', gymRoutes);
app.use('/33120102/members', memberRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
