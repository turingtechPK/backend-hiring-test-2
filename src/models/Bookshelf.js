const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookshelfSchema = new Schema({
  name: { type: String, required: true },
  volumes: [{ type: Schema.Types.ObjectId, ref: "Volume" }],
  visibility: { type: String, required: true, enum: ["public", "private"] },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Bookshelf = mongoose.model("Bookshelf", BookshelfSchema);

module.exports = Bookshelf;
