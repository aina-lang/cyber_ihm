// Client.js

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
        required: true,
        unique: true
    },
    macAddress: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
   
    isRunning: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
