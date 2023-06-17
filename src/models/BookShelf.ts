import mongoose, { Schema } from 'mongoose';

const BookShelfSchema = new Schema({
  name: { type: String, required: true },
  bookshelfs: [{ type: Schema.Types.ObjectId, ref: "Bookshelf" }],
  visibility: { type: String, required: true, enum: ["public", "private"] },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const BookShelf = mongoose.model("Bookshelf", BookShelfSchema);

module.exports = BookShelf;