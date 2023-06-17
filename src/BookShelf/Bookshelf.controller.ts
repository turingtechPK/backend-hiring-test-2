import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { BookshelfService } from "./Bookshelf.service";

/* This is a TypeScript class that defines a controller for adding bookshelfs with specific properties to
a bookshelf service. */
@Controller('bookshelf')
export class BookshelfController{
    constructor (private readonly bookshelfService: BookshelfService) {}

    @Post()
    addBookshelf(
        @Body('title') bookshelfTitle: string, 
        @Body('vols') vols: string, 
        @Body('bookshelfDesc') bookshelfDesc: string) : any {

            const generatedId = this.bookshelfService.insertBookshelf(bookshelfTitle, vols, bookshelfDesc);
            return {id: generatedId}; 
    }

    @Get(':id')
    getBookshelfs(@Param('id') shelfId: string) {
        return this.bookshelfService.getBookshelfs(shelfId);
    }
} 