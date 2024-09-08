const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length >= 5;
            },
            message: "You must provide a valid name more than 3 characters",
        },
    },
    age: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v >= 17 && v <= 40;
            },
            message: "You must provide a valid age between 18 and 40",
        },
    },
    salary: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return v >= 100 && v <= 500;
            },
            message: "You must provide a valid salary between 100 and 500",
        },
    },
});

module.exports = mongoose.model('Player', playerSchema);