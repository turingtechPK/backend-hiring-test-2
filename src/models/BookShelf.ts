import mongoose, { Schema } from 'mongoose';

const BookShelfSchema = new Schema({
  name: { type: String, required: true },
  volumes: [{ type: Schema.Types.ObjectId, ref: "Volume" }],
  visibility: { type: String, required: true, enum: ["public", "private"] },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const BookShelf = mongoose.model("Bookshelf", BookShelfSchema);

module.exports = BookShelf;