const mongoose = require("mongoose");
const { Schema } = mongoose;

const VolumeSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String },
  published_date: { type: Date },
  description: { type: String },
});

const Volume = mongoose.model("Volume", VolumeSchema);

module.exports = Volume;
