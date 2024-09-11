const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// Get all members
router.get('/', memberController.getMembers);

// Update a member
router.put('/:memberId', memberController.updateMember);

// Add a member
router.post('/add', memberController.addMember);


module.exports = router;
