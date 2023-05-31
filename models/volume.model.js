const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const volumeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  text: {
    type: String,
    required: true,
  },
  

}, {
  timestamps: true,
});

const Volume = mongoose.model('Volume', volumeSchema);
Volume.createIndexes();
module.exports = Volume;