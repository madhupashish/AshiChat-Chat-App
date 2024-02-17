const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Assuming email should be unique
    },
    image: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isOnline: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true });

module.exports = mongoose.model('CurrentUsers', userSchema); // case sensitive
