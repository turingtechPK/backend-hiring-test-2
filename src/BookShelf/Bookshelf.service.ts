import { Injectable, NotFoundException } from '@nestjs/common';
import { Bookshelf } from '../models/Bookshelf.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Volume } from 'src/models/Volume.model';
import { User } from 'src/models/User.model';

/* This is a TypeScript class that provides methods for CRUD operations on a bookshelf model, including
inserting, getting, updating, and deleting bookshelves. */
@Injectable() 
export class BookshelfService{

    /**
     * This is a constructor function that injects a model called "Bookshelf" into the class.
     * @param bookshelfModel - The `bookshelfModel` parameter is an instance of the `Model` class from
     * the Mongoose library, which is used to interact with a MongoDB database. It is injected into the
     * constructor using the `@InjectModel` decorator and is bound to the `Bookshelf` model, which
     * represents a
     */
    constructor( 
        @InjectModel('Bookshelf') private readonly bookshelfModel: Model<Bookshelf>
    ) {}

    /**
     * This function inserts a new bookshelf with a given title, list of volumes, description, and
     * visibility into a database and returns its ID.
     * @param {string} shelfTitle - A string representing the title of the bookshelf being created.
     * @param {Volume[]} vols - an array of Volume objects that represent the books to be added to the
     * bookshelf.
     * @param {string} description - The description parameter is a string that represents the
     * description of the bookshelf being created. It can contain any relevant information about the
     * bookshelf, such as its purpose or contents.
     * @param {'public'|'private'} visibility - The `visibility` parameter is a string that specifies
     * whether the bookshelf should be public or private. It can have two possible values: `'public'`
     * or `'private'`. If the value is `'public'`, the bookshelf will be visible to everyone, while if
     * the value is `'private
     * @returns the ID of the newly created bookshelf as a string.
     */
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

    /**
     * This function retrieves all bookshelves from the database using an asynchronous operation.
     * @returns The `getBookshelves` function is returning the result of the `find()` method executed
     * on the `bookshelfModel`. This result is a Promise that resolves to an array of bookshelf
     * objects.
     */
    async getBookshelves(){
        const result = await this.bookshelfModel.find().exec()
        return result; 
    }

    /**
     * This function retrieves a bookshelf by its ID and throws a NotFoundException if it cannot be
     * found.
     * @param {string} shelfId - a string representing the ID of the bookshelf that needs to be
     * retrieved.
     * @returns A Promise that resolves to a Bookshelf object.
     */
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

    /**
     * This function updates a bookshelf's title, volumes, description, and visibility.
     * @param {string} shelfId - a string representing the ID of the bookshelf to be updated
     * @param {string} title - A string representing the new title for the bookshelf.
     * @param {Volume[]} vols - an array of Volume objects that represent the books in the bookshelf.
     * @param {string} desc - A string representing the description of the bookshelf.
     * @param {'public' | 'private'} visibility - A string that can only be either "public" or
     * "private", indicating the visibility of the bookshelf. If set to "public", the bookshelf can be
     * viewed by anyone. If set to "private", only the owner of the bookshelf can view it.
     */
    async updateBookshelf(
        shelfId: string,
        title: string,
        vols: Volume[],
        desc: string,
        visibility: 'public' | 'private',
      ) {
        const updatedShelf = await this.findBookshelf(shelfId);
        if (title) {
          updatedShelf.shelfTitle = title;
        }
        if (desc) {
          updatedShelf.shelfDesc = desc;
        }
        if (vols) {
          updatedShelf.volumes = JSON.stringify(vols);
        }
        if (visibility) {
          updatedShelf.visibility = visibility;
        }
        updatedShelf.save();
      }
    
      /**
       * This function deletes a bookshelf by its ID and throws an exception if the bookshelf is not
       * found.
       * @param {string} shelfId - a string representing the unique identifier of the bookshelf to be
       * deleted.
       */
      async deleteBookshelf(shelfId: string) {
        const result = await this.bookshelfModel.deleteOne({_id: shelfId}).exec();
        if (result.deletedCount === 0) {
          throw new NotFoundException('Could not find bookshelf.');
        }
      }
    
      /**
       * This function finds a bookshelf by its ID and returns it as a Promise, throwing a
       * NotFoundException if it cannot be found.
       * @param {string} id - a string representing the unique identifier of a bookshelf that needs to
       * be found. The function uses this id to search for the bookshelf in the database.
       * @returns The function `findBookshelf` returns a Promise that resolves to a `Bookshelf` object.
       */
      private async findBookshelf(id: string): Promise<Bookshelf> {
        let result;
        try {
          result = await this.bookshelfModel.findById(id).exec();
        } catch (error) {
          throw new NotFoundException('Could not find bookshelf.');
        }
        if (!result) {
          throw new NotFoundException('Could not find bookshelf.');
        }
        return result;
      }
}