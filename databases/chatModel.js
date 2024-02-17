const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
    senderID: {
        type: Schema.Types.ObjectId,
        ref: 'currentUsers', // Establishing a relationship with the 'currentUsers' collection
        required: true
    },
    receiverID: {
        type: Schema.Types.ObjectId,
        ref: 'currentUsers',
        required: true
    },
    message: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = model('Chat', chatSchema);
