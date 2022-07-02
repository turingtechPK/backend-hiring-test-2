const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  ownerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    default: 0,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Account', AccountSchema);
