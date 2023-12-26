const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    // 1- Mongoose.Schema => Mongoose is a Library having a "Schema" functionality.
    // 2- Types => To retrieve data types of each document correctly.
    // 3- Objectid => One of the data type defined by schema by default.
    
    sender_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'currentUsers' // ref: 'Users' => Developing a relationship between both fields.
    },
    receiver_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'currentUsers'
    },
    message: {
        type: String,
        rrequire: true
    },

},
    { timestamps: true } // This option is used to automatically add two fields to each document in the collection: "createdAt" and "updatedAt".
);

module.exports = mongoose.model('chats', chatSchema)

