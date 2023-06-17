import * as mongoose from 'mongoose';

export const BookshelfSchema = new mongoose.Schema ({
    shelfid: { type: String, required: true },
    shelfTitle: { type: String, required: true},
    volumes: { type: String },
    shelfDesc: {type: String}
});

export interface Bookshelf {
    shelfId : string;
    shelfTitle: string;
    volumes: string;
    shelfDesc: string;
    
};
