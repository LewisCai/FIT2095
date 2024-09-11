const express = require('express');
const router = express.Router();
const gymController = require('../controllers/gymController');

// Get all gyms
router.get('/', gymController.getGyms);

// Add a gym
router.post('/add', gymController.addGym);

// Add member to gym
router.put('/add-member/:gymId/:memberId', gymController.addMemberToGym);

// Delete a gym
router.delete('/:gymId', gymController.deleteGym);

module.exports = router;
