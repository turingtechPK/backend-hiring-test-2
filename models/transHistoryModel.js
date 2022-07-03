const mongoose = require('mongoose');

const { Schema } = mongoose;

const tranHisSchema = new Schema({
  accountNumber: {
    type: Number,
  },
  depositAmount: {
    type: Number,
    default: 0,
    trim: true,
  },
  withdrawAmount: {
    type: Number,
    default: 0,
    trim: true,
  },
  transferAmount: {
    type: Number,
    default: 0,
    trim: true,
  },
  netAmount: {
    type: Number,
    trim: true,
    required: true,
  },
  createdAt: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model('TransHis', tranHisSchema);
