import { Test, TestingModule } from '@nestjs/testing';
import { BookShelfController } from './bookshelf.controller';
import { BookShelfService } from './bookshelf.service';
import { BookShelf } from './bookshelf.interface';
import { BookShelfCreateDto } from './bookshelf.dto';

describe('BookShelfController', () => {
    let controller: BookShelfController;
    let bookShelfService: BookShelfService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookShelfController],
            providers: [BookShelfService],
        }).compile();

        controller = module.get<BookShelfController>(BookShelfController);
        bookShelfService = module.get<BookShelfService>(BookShelfService);
    });

    describe('getAllBookShelf', () => {
        it('should return all owned and public bookshelves for the specified user', () => {
            const userId = 1;
            const bookShelves: BookShelf[] = [
                { id: 1, name: 'Bookshelf 1', volumes: [1, 2, 3], isPrivate: false, userId },
                { id: 2, name: 'Bookshelf 2', volumes: [4, 5, 6], isPrivate: true, userId },
            ];

            jest.spyOn(bookShelfService, 'getAllBookShelfByUserId').mockReturnValue(bookShelves);

            expect(controller.getAllBookShelf(userId)).toEqual(bookShelves);
        });
    });

    describe('getBookShelfById', () => {
        it('should return the bookshelf with the specified ID if the current user owns it', () => {
            const userId = 1;
            const bookShelfId = 1;
            const bookShelf: BookShelf = {
                id: bookShelfId,
                name: 'Bookshelf',
                volumes: [1, 2, 3],
                isPrivate: true,
                userId,
            };

            jest.spyOn(bookShelfService, 'getBookShelfById').mockReturnValue(bookShelf);

            expect(controller.getBookShelfById(userId, bookShelfId)).toEqual(bookShelf);
        });
    });

    describe('getAllPrivateBookShelf', () => {
        it('should return all private bookshelves owned by the specified user', () => {
            const userId = 1;
            const privateBookShelves: BookShelf[] = [
                { id: 1, name: 'Private Bookshelf 1', volumes: [1, 2, 3], isPrivate: true, userId },
                { id: 2, name: 'Private Bookshelf 2', volumes: [4, 5, 6], isPrivate: true, userId },
            ];

            jest.spyOn(bookShelfService, 'getAllPrivateBookShelf').mockReturnValue(privateBookShelves);

            expect(controller.getAllPrivateBookShelf(userId)).toEqual(privateBookShelves);
        });
    });

    describe('createBookShelf', () => {
        it('should create a new bookshelf for the specified user', () => {
            const userId = 1;
            const bookShelfDto: BookShelfCreateDto = {
                name: 'New Bookshelf',
                volumes: [1, 2, 3],
                isPrivate: true,
            };
            const createdBookShelf: BookShelf = {
                id: 1,
                name: 'New Bookshelf',
                volumes: [1, 2, 3],
                isPrivate: true,
                userId,
            };

            jest.spyOn(bookShelfService, 'createBookShelf').mockReturnValue(createdBookShelf);

            expect(controller.createBookShelf(userId, bookShelfDto)).toEqual(createdBookShelf);
        });
    });

    describe('updateBookshelf', () => {
        it('should update the bookshelf with the specified ID if the current user owns it', () => {
            const userId = 1;
            const bookShelfId = 1;
            const updatedBookShelf: BookShelf = {
                id: bookShelfId,
                name: 'Updated Bookshelf',
                volumes: [4, 5, 6],
                isPrivate: false,
                userId,
            };

            jest.spyOn(bookShelfService, 'updateBookShelf').mockReturnValue(updatedBookShelf);

            expect(controller.updateBookshelf(userId, bookShelfId, updatedBookShelf)).toEqual(updatedBookShelf);
        });
    });

    describe('deleteBookShelf', () => {
        it('should delete the bookshelf with the specified ID if the current user owns it', () => {
            const userId = 1;
            const bookShelfId = 1;

            jest.spyOn(bookShelfService, 'deleteBookShelf');

            controller.deleteBookShelf(userId, bookShelfId);

            expect(bookShelfService.deleteBookShelf).toHaveBeenCalledWith(bookShelfId, userId);
        });
    });
});