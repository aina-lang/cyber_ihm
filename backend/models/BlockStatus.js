// blockStatusModel.js

const mongoose = require('mongoose');

const blockStatusSchema = new mongoose.Schema({
  blockAllClientsCalled: {
    type: Boolean,
    default: false
  }
});

const BlockStatus = mongoose.model('BlockStatus', blockStatusSchema);

module.exports = BlockStatus;
