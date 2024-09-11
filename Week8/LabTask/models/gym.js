const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MemberSchema = require('./member').schema; // Import the schema, not the model

const GymSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Gym name is required.'],
        minlength: [3, 'Gym name must be at least 3 characters long.']
    },
    location: {
        type: String,
        required: [true, 'Gym location is required.'],
        minlength: [10, 'Gym location must be at least 10 characters long.']
    },
    members: [MemberSchema] // Validation for members is handled in the MemberSchema
});


// Create and export the Gym model
const Gym = mongoose.model('Gym', GymSchema);

module.exports = Gym;
