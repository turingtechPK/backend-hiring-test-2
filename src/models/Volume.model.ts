import * as mongoose from 'mongoose';

/* This code is defining a Mongoose schema named `VolumeSchema` for a MongoDB collection. The schema
specifies the structure of the documents that can be stored in the collection, including the
properties `name`, `author`, `published_date`, and `description`, and their respective data types.
The `required` property is set to `true` for the `name` property, which means that a document cannot
be saved to the database without a value for this property. The schema is exported so that it can be
used in other parts of the application. */
export const VolumeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String },
    published_date: { type: Date },
    description: { type: String },
});


/* This code is defining an interface named `Volume` that extends the `mongoose.Document` interface.
The `Volume` interface specifies the structure of a document that can be stored in a MongoDB
database using the `VolumeSchema`. It defines the properties of the document, including `name`,
`author`, `published_date`, and `description`, and their respective data types. This interface can
be used to create, update, and retrieve documents from the database. */
export interface Volume extends mongoose.Document {
    name : string;
    author: string;
    published_date: Date;
    description: string;
    
};