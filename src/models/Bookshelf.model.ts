import * as mongoose from 'mongoose';

/* This code is defining a Mongoose schema for a bookshelf. It specifies the fields that a bookshelf
document should have, such as `shelfTitle`, `volumes`, `shelfDesc`, and `visibility`. The
`mongoose.Schema` constructor is used to create the schema object, which is then exported as
`BookshelfSchema`. */
export const BookshelfSchema = new mongoose.Schema({
  shelfTitle: { type: String, required: true },
  volumes: { type: String, require: true},
  shelfDesc: { type: String },
  visibility: { type: String, required: true, enum: ['public', 'private'] },
  //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

/* This code is defining an interface named `Bookshelf` that extends the `mongoose.Document` interface.
It specifies the fields that a `Bookshelf` document should have, such as `shelfTitle`, `volumes`,
`shelfDesc`, and `visibility`. The `mongoose.Document` interface provides the basic functionality
for a Mongoose document, such as saving and updating. By extending this interface, the `Bookshelf`
interface inherits this functionality and adds the specific fields that are required for a bookshelf
document. This interface can be used to define the type of a variable or parameter that represents a
bookshelf document in TypeScript code. */
export interface Bookshelf extends mongoose.Document {
  shelfTitle: string;
  volumes: string;
  shelfDesc: string;
  visibility: 'public' | 'private';
  //user: mongoose.Schema.Types.ObjectId;
}
