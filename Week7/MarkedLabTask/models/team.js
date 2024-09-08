const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length >= 3;
            },
            message: "You must provide a valid name more than 3 characters",
        },
    },
    rank: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v >= 1 && v <= 24;
            },
            message: "You must provide a valid rank between 1 and 24",
        },
    },
    players: {
        type: Array
    },
});

module.exports = mongoose.model('Team', playerSchema);