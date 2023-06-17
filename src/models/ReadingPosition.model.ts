import * as mongoose from 'mongoose';

/* This code is defining a Mongoose schema for a reading position. It has four fields: `user`,
`bookshelf`, `lineNumber`, and `wordNumber`. The `user` and `bookshelf` fields are references to the
`User` and `Bookshelf` models, respectively. The `lineNumber` and `wordNumber` fields are numbers
that represent the position of the user's reading in the book. The schema is then exported as a
constant variable named `ReadingPositionSchema`. */
export const ReadingPositionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookshelf: { type: mongoose.Schema.Types.ObjectId, ref: "Bookshelf", required: true },
    lineNumber: { type: Number, required: true },
    wordNumber: { type: Number, required: true },
  });
  