const mongoose = require('mongoose');

const bookshelfSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    isPublic: {
      type: Boolean,
      default: false
    },
    volumes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volume'
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  });

const BookShelf = mongoose.model('BookShelf', bookshelfSchema);
BookShelf.createIndexes();
module.exports = BookShelf;