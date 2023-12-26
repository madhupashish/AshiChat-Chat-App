const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isOnline: {
        type: String,
        default:'0'
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('currentusers', userSchema) // case sensitive