const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Member name is required.'],
        minlength: [5, 'Member name must be at least 5 characters long.']
    },
    age: {
        type: Number,
        required: [true, 'Member age is required.'],
        min: [15, 'Member age must be at least 15.']
    },
    phone: {
        type: String,
        required: [true, 'Member phone number is required.'],
        minlength: [8, 'Member phone number must be at least 8 characters long.']
    }
});


// Create and export the Member model
const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;
