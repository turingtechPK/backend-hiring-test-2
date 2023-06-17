import { Controller, Post, Body, Get, Param, Delete, Patch } from "@nestjs/common";
import { BookshelfService } from "../BookShelf/Bookshelf.service";
import { Volume } from "src/models/Volume.model";
import { User } from "src/models/User.model";


/* This is a TypeScript class that defines a BookshelfController with methods for adding, getting,
updating, and deleting bookshelves. */
@Controller('bookshelf')
export class BookshelfController{
   /**
    * This is a constructor function that takes in a BookshelfService as a parameter and assigns it to
    * a private readonly property.
    * @param {BookshelfService} bookshelfService - BookshelfService is a dependency injection parameter
    * that is being injected into the constructor of a class. It is marked as "private readonly", which
    * means that it can only be accessed within the class and cannot be modified from outside the
    * class. The BookshelfService is likely a service class that provides functionality related
    */
    constructor (private readonly bookshelfService: BookshelfService) {}

    /* This is a method in the BookshelfController class that is decorated with the `@Post()`
    decorator, indicating that it will handle HTTP POST requests to the '/bookshelf' endpoint. It
    takes in data from the request body using the `@Body()` decorator to extract the values for
    `bookshelfTitle`, `vols`, `bookshelfDesc`, and `visibility`. It then calls the
    `insertBookshelf()` method of the `bookshelfService` to add a new bookshelf to the database with
    the provided data. Finally, it returns an object with the ID of the newly created bookshelf. */
    @Post()
    async addBookshelf(
        @Body('title') bookshelfTitle: string, 
        @Body('vols') vols: Volume[], 
        @Body('shelfDesc') bookshelfDesc: string,
        @Body('visib') visibility: 'public'|'private',
        //@Body('user') user: User
        ) {

            const generatedId = await this.bookshelfService.insertBookshelf(bookshelfTitle, vols, bookshelfDesc, visibility);
            return {id: generatedId}; 
    }

    /* This is a method in the `BookshelfController` class that is decorated with the `@Get()`
    decorator, indicating that it will handle HTTP GET requests to the '/bookshelf' endpoint. It
    calls the `getBookshelves()` method of the `bookshelfService` to retrieve all bookshelves from
    the database. Finally, it returns the retrieved bookshelves. */
    @Get()
    async getBookshelves(){
       const Bookshelves = await this.bookshelfService.getBookshelves(); 
       return Bookshelves; 
    }

    /* This is a method in the `BookshelfController` class that is decorated with the `@Get()`
    decorator and takes a parameter `id` in the URL path. It retrieves the `shelfId` from the URL
    path using the `@Param()` decorator and passes it to the `getBookshelf()` method of the
    `bookshelfService` to retrieve the bookshelf with the specified ID from the database. Finally,
    it returns the retrieved bookshelf. */
    @Get(':id')
    getBookshelf(@Param('id') shelfId: string) {
        return this.bookshelfService.getBookshelf(shelfId);
    }

    /* This is a method in the `BookshelfController` class that is decorated with the `@Patch()`
    decorator and takes a parameter `id` in the URL path. It updates an existing bookshelf in the
    database with the specified `shelfId` by calling the `updateBookshelf()` method of the
    `bookshelfService` and passing in the updated values for `shelfTitle`, `vols`, `shelfDesc`, and
    `visibility`. Finally, it returns `null`. */
    @Patch(':id')
        async updateBookshelf(
        @Param('id') shelfId: string,
        @Body('title') shelfTitle: string,
        @Body('vols') vols: Volume[],
        @Body('desc') shelfDesc: string,
        @Body('visib') visibility: 'public'|'private'
    ) {
    await this.bookshelfService.updateBookshelf(shelfId, shelfTitle, vols,shelfDesc, visibility);
        return null;
    }

    /* This is a method in the `BookshelfController` class that is decorated with the `@Delete()`
    decorator and takes a parameter `id` in the URL path. It deletes an existing bookshelf from the
    database with the specified `shelfId` by calling the `deleteBookshelf()` method of the
    `bookshelfService`. Finally, it returns `null`. */
    @Delete(':id')
    async removeProduct(@Param('id') shelfId: string) {
        await this.bookshelfService.deleteBookshelf(shelfId);
        return null;
    }
} 