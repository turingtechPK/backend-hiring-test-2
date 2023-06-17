import * as mongoose from 'mongoose';

export const BookshelfSchema = new mongoose.Schema({
  shelfTitle: { type: String, required: true },
  volumes: { type: String, require: true},
  shelfDesc: { type: String },
  visibility: { type: String, required: true, enum: ['public', 'private'] },
  //user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export interface Bookshelf extends mongoose.Document {
  shelfTitle: string;
  volumes: string;
  shelfDesc: string;
  visibility: 'public' | 'private';
  //user: mongoose.Schema.Types.ObjectId;
}
