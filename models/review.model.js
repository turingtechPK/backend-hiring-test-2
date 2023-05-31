const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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

const Review = mongoose.model('Review', reviewSchema);
Review.createIndexes();
module.exports = Review;