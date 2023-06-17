import { Injectable, NotFoundException } from '@nestjs/common';
import { Bookshelf } from '../models/Bookshelf.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Volume } from 'src/models/Volume.model';
import { User } from 'src/models/User.model';

/* The BookshelfService class is an Injectable service that allows for the insertion of new Bookshelf objects
into an array. */
@Injectable() 
export class BookshelfService{

    private Bookshelf: Bookshelf[] = [];

    constructor( 
        @InjectModel('Bookshelf') private readonly bookshelfModel: Model<Bookshelf>
        ) {}

    async insertBookshelf(shelfTitle: string, vols: Volume[], description: string, visibility: 'public'|'private') {
        const volList = JSON.stringify(vols);
        const newBookshelf = new this.bookshelfModel({
            shelfTitle: shelfTitle, 
            volumes: volList, 
            shelfDesc: description,
            visibility: visibility
        });
        const result = await newBookshelf.save()
        return result.id as string;
    }

    async getBookshelves(){
        const result = await this.bookshelfModel.find().exec()
        return result; 
    }

    async getBookshelf(shelfId: string): Promise<Bookshelf> {
        let bookshelf;
        
        try {
            bookshelf =  await this.bookshelfModel.findById(shelfId);
        } catch (error) {
            throw new NotFoundException ('Could not find bookshelf');
        }

        if (!bookshelf){
            throw new NotFoundException('Could not find bookshelf');
        }
        return bookshelf;
    }
}