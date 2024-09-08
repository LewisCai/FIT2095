const express = require('express');
const router = express.Router();
const Player = require('../models/player'); // Import the Player model

// Add Player Page: GET /linjun/players/add
router.get('/linjun/players/add', async (req, res) => {
    try {
        const playerCount = await Player.countDocuments();  // Get the count of players
        res.render('add_player', { playerCount });  // Pass the player count to the EJS template
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Add Player: POST /linjun/players/add
router.post('/linjun/players/add', async (req, res) => {
    const { name, age, salary } = req.body;  // Capture the age field from the form

    const player = new Player({
        name,
        age,
        salary
    });

    try {
        await player.save();  // Save the player to the database
        res.redirect('/');  // Redirect to the add player page after successful submission
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding player');
    }
});


module.exports = router;
