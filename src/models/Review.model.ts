import * as mongoose from 'mongoose';

/* This code is defining a Mongoose schema named `ReviewSchema` for storing reviews in a MongoDB
database. The schema specifies the structure of a review document, including the data types and
validation rules for each field. The `user` and `bookshelf` fields are references to other documents
in the database, while the `text` and `rating` fields are strings and numbers, respectively. The
schema is exported so that it can be used to create Mongoose models for interacting with the
database. */
export const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookshelf: { type: mongoose.Schema.Types.ObjectId, ref: "Bookshelf", required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, required: true },
});

/* This code is defining an interface named `Review` that extends the `mongoose.Document` interface.
The `Review` interface specifies the structure of a document that can be stored in the MongoDB
database using the `ReviewSchema`. It defines four properties: `user`, `bookshelf`, `text`, and
`rating`, each with a specific data type. This interface is used to provide type checking and code
completion when working with documents of the `Review` type in TypeScript. */
export interface Review extends mongoose.Document {
  user: string;
  bookshelf: string;
  text: string;
  rating: Number;
}
  