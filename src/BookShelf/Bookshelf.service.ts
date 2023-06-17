import { Injectable, NotFoundException } from '@nestjs/common';
import { Bookshelf } from './Bookshelf.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
/* The BookshelfService class is an Injectable service that allows for the insertion of new Bookshelf objects
into an array. */
@Injectable() 
export class BookshelfService{

    private Bookshelf: Bookshelf[] = [];

    constructor( 
        @InjectModel('Bookshelf') private readonly bookshelfModel: Model<Bookshelf>
        ) {}

    async insertBookshelf(shelfTitle: string, vols: string, description: string) {
        const newBookshelf = new this.bookshelfModel({
            shelfTitle: shelfTitle, 
            volumes: vols, 
            shelfDesc: description
        });
        const result = await newBookshelf.save()
        console.log(result);
    }

    getBookshelfs(shelfId: string) {
        const results =  this.Bookshelf.find((shelf) => shelf.shelfId === shelfId);
        if (!results){
            throw new NotFoundException('Could not find bookshelf');
        }
        return {...results};
    }
}