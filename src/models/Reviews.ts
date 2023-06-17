import mongoose, { Schema } from 'mongoose';

const ReviewsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    bookshelf: { type: Schema.Types.ObjectId, ref: "Bookshelf", required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
  });
  
  const Review = mongoose.model("Reviews", ReviewsSchema);
  
  module.exports = Review;