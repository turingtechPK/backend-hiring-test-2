const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    volume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Volume',
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  });

const Position = mongoose.model('Position', positionSchema);
Position.createIndexes();
module.exports = Position;