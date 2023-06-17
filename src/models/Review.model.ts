import * as mongoose from 'mongoose';

export const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookshelf: { type: mongoose.Schema.Types.ObjectId, ref: "Bookshelf", required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
});

export interface Review extends mongoose.Document {
  user: string;
  bookshelf: string;
  text: string;
  rating: Number;
}
  