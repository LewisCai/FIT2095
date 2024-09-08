const express = require('express');
const mongoose = require('mongoose');
let ejs = require("ejs");
const app = express();

// Import routes
const playerRoutes = require('./routes/player-route');
const teamRoutes = require('./routes/team-route');

// Middleware
app.use(express.urlencoded({ extended: true }));

// Configure Express for EJS
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.set('view engine', 'ejs');
app.set('views', './views'); 


// Use the routes
app.use('/', teamRoutes); // Handle team-related routes
app.use('/', playerRoutes); // Handle player-related routes

// Database connection and server startup
mongoose.connect('mongodb://localhost:27017/sportsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error:', err.message);
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
