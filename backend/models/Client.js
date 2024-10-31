// Client.js

const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
    // unique: true
  },
  macAddress: {
    type: String,
    required: true,
    // unique: true
  },
  name: {
    type: String,
  },
  isLocal: {
    type: Boolean,
    default: true,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  spentCost: { type: Number, default: 0 },
  elapsedTime: {
    type: String,
    default: 0,
  },
  isRunning: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
