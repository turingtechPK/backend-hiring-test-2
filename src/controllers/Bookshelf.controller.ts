import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { BookshelfService } from "../BookShelf/Bookshelf.service";
import { Volume } from "src/models/Volume.model";
import { User } from "src/models/User.model";

/* This is a TypeScript class that defines a controller for adding bookshelfs with specific properties to
a bookshelf service. */
@Controller('bookshelf')
export class BookshelfController{
    constructor (private readonly bookshelfService: BookshelfService) {}

    @Post()
    async addBookshelf(
        @Body('title') bookshelfTitle: string, 
        @Body('vols') vols: Volume[], 
        @Body('bookshelfDesc') bookshelfDesc: string,
        @Body('visib') visibility: 'public'|'private',
        //@Body('user') user: User
        ) {

            const generatedId = await this.bookshelfService.insertBookshelf(bookshelfTitle, vols, bookshelfDesc, visibility);
            return {id: generatedId}; 
    }

    @Get()
    async getBookshelves(){
       const Bookshelves = await this.bookshelfService.getBookshelves(); 
       return Bookshelves; 
    }

    @Get(':id')
    getBookshelf(@Param('id') shelfId: string) {
        return this.bookshelfService.getBookshelf(shelfId);
    }
} 