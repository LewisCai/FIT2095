const express = require('express');
const path = require('path');
const router = express.Router();
const Team = require('../models/team'); 
const Player = require('../models/player'); 

// Homepage: GET /
router.get('/', async (req, res) => {
    try {
        // Fetch the teams and players from MongoDB
        const teams = await Team.find().populate('players');
        const totalTeams = await Team.countDocuments();  // Total number of teams
        const totalPlayers = await Player.countDocuments();  // Total number of players

        // Render the EJS template and pass the data
        res.render('index', { teams, totalTeams, totalPlayers });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Get Teams: GET /linjun/teams
router.get('/linjun/teams', async (req, res) => {
    try {
        const teams = await Team.find().populate('players');  // Fetch teams with players
        res.render('teams', { teams });  // Render the EJS template and pass teams data
    } catch (err) {
        res.status(500).send('Error retrieving teams data.');
    }
});

// Add Team Page: GET /linjun/teams/add
router.get('/linjun/teams/add', async (req, res) => {
    try {
        const teamCount = await Team.countDocuments();  // Get the count of teams
        res.render('add_team', { teamCount });  // Pass the team count to the EJS template
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


// Add Team: POST /linjun/teams/add
router.post('/linjun/teams/add', async (req, res) => {
    const { name, rank } = req.body;
    const team = new Team({ name, rank });

    try {
        await team.save();
        res.redirect(`/linjun/teams`);
    } catch (e) {
        console.log('Error:', e.message);
        res.send('Error adding team');
    }
});

// Add Player to Team Page: GET /linjun/add_player_to_team
router.get('/linjun/teams/add-player', async (req, res) => {
    try {
        // Fetch all teams and players to populate the dropdowns (optional if you want to help users pick)
        const teams = await Team.find();
        const players = await Player.find();

        // Render the form and pass teams and players to the EJS template (if using EJS) or render HTML page
        res.render('add_player_team', { teams, players });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(500).send('Error loading the form');
    }
});

// Add Player to Team: POST /linjun/teams/add-player
router.post('/linjun/teams/add-player', async (req, res) => {
    const { teamId, playerId } = req.body;

    try {
        // Find the team by its ID
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).send('Team not found');
        }

        // Add the player ID to the players array of the team
        team.players.push(playerId);

        // Save the updated team document
        await team.save();

        // Redirect the user to the teams page (to show all teams)
        res.redirect('/linjun/teams');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding player to team');
    }
});


module.exports = router;
