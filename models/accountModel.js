const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const accountSchema = new Schema({
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
    unique: true,
  },
  amount: {
    type: Number,
    default: 1,
    trim: true,
  },
});

accountSchema.pre('save', async function (next) {
  this.accountNumber = parseInt(Math.random().toString().substr(2, 6), 10);
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('Account', accountSchema);
