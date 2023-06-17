import * as mongoose from 'mongoose';

export const VolumeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String },
    published_date: { type: Date },
    description: { type: String },
});


export interface Volume extends mongoose.Document {
    name : string;
    author: string;
    published_date: Date;
    description: string;
    
};