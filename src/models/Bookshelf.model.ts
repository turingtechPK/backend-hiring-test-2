import * as mongoose from 'mongoose';

export const BookshelfSchema = new mongoose.Schema ({
    shelfTitle: { type: String, required: true},
    volumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bookshelf" }],
    shelfDesc: {type: String},
    visibility: { type: String, required: true, enum: ["public", "private"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
});

export interface Bookshelf extends mongoose.Document {
    shelfId : string;
    shelfTitle: string;
    volumes: mongoose.Schema.Types.ObjectId;
    shelfDesc: string;
};
