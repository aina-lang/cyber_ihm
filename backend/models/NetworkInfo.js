// networkInfo.js

const mongoose = require('mongoose');

const networkInfoSchema = new mongoose.Schema({
    gatewayIP: {
        type: String,
        required: true
    },
    tracerouteOutput: {
        type: String,
        required: true
    },
    macAddress: {
        type: String,
        required: true
    }
});

const NetworkInfo = mongoose.model('NetworkInfo', networkInfoSchema);

module.exports = NetworkInfo;
