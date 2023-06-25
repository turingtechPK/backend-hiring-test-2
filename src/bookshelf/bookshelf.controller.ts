import { Controller, Get, Post, Put, Delete, Param, Body, Headers, ValidationPipe } from '@nestjs/common';
import { BookShelfService } from './bookshelf.service';
import { BookShelf } from './bookshelf.interface';
import { BookShelfCreateDto } from './bookshelf.dto';
import { ApiHeader, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('bookshelf')
export class BookShelfController {
  constructor(private readonly BookShelfService: BookShelfService) { }

  @Get()
  @ApiHeader({ name: 'userId', description: 'Id of current user', required: true })
  @ApiResponse({ status: 200, description: "get all the owned and pulbic bookshelves" })
  getAllBookShelf(@Headers('userId') userId: number): BookShelf[] {
    return this.BookShelfService.getAllBookShelfByUserId(userId);
  }

  @Get(':id')
  @ApiHeader({ name: 'userId', description: 'Id of current user', required: true })
  @ApiResponse({ status: 200, description: "get the bookshlef with id only if current user owns it" })
  getBookShelfById(@Headers('userId') userId: number, @Param('id') id: number): BookShelf {
    return this.BookShelfService.getBookShelfById(id, userId);
  }

  @Get('/private')
  @ApiHeader({ name: 'userId', description: 'Id of current user', required: true })
  @ApiResponse({ status: 200, description: "get all the bookshelf owned by current user" })
  getAllPrivateBookShelf(@Headers('userId') userId: number): BookShelf[] {
    return this.BookShelfService.getAllPrivateBookShelf(userId);
  }

  @Post()
  @ApiHeader({ name: 'userId', description: 'Id of current user', required: true })
  @ApiBody({
    description: 'Request body', type: BookShelfCreateDto, examples: {
      example: {
        value: {
          "name": "fav",
          "volumes": [1, 2, 3],
          "isPrivate": true
        }
      }
    }
  })
  @ApiResponse({
    status: 201, description: "Create a bookshelf", schema: {
      example: {
        "name": "fav",
        "volumes": [1, 2, 3],
        "isPrivate": true,
        "id": 1,
        "userId": "1"
      }
    }
  })
  createBookShelf(@Headers('userId') userId: number, @Body(ValidationPipe) bookShelf: BookShelfCreateDto): BookShelf {
    let id = 1;
    if (this.BookShelfService.getAllBookShelf().length > 0) {
      id = this.BookShelfService.getAllBookShelf()[this.BookShelfService.getAllBookShelf().length - 1].id;
      id++;
    }
    let newBookShelf: BookShelf = { ...bookShelf, id: id, userId };
    return this.BookShelfService.createBookShelf(newBookShelf);
  }

  @Put(':id')
  @ApiHeader({ name: 'userId', description: 'Id of current user', required: true })
  @ApiResponse({ status: 200, description: "update the bookshelf by bookshelf id only if the current user owns it" })
  updateBookshelf(@Headers('userId') userId: number, @Param('id') id: number, @Body() bookShelf: BookShelf): BookShelf {
    return this.BookShelfService.updateBookShelf(id, bookShelf, userId);
  }

  @Delete(':id')
  @ApiHeader({ name: 'userId', description: 'Id of current user', required: true })
  @ApiResponse({ status: 200, description: "delete the bookshelf by bookshelf id only if the current user owns it" })
  deleteBookShelf(@Headers('userId') userId: number, @Param('id') id: number): void {
    this.BookShelfService.deleteBookShelf(id, userId);
  }
}