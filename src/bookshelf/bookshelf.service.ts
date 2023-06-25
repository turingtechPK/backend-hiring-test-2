import { Injectable, NotFoundException } from '@nestjs/common';
import { BookShelf } from './BookShelf.interface';

@Injectable()
export class BookShelfService {
  private BookShelf: BookShelf[] = [];

  getAllBookShelf(): BookShelf[] {
    return this.BookShelf;
  }

  getAllBookShelfByUserId(userId: number): BookShelf[] {
    return this.BookShelf.filter(b => b.isPrivate == false || b.userId == userId)
  }

  getBookShelfById(id: number, userId: number): BookShelf {
    return this.BookShelf.find((BookShelf) => BookShelf.id == id && (BookShelf.userId == userId || BookShelf.isPrivate == false));
  }

  getAllPrivateBookShelf(userId: number): BookShelf[] {
    return this.BookShelf.filter((BookShelf) => BookShelf.userId == userId);
  }

  createBookShelf(BookShelf: BookShelf): BookShelf {
    this.BookShelf.push(BookShelf);
    return BookShelf;
  }

  updateBookShelf(id: number, BookShelf: BookShelf, userId: number): BookShelf {
    const index = this.BookShelf.findIndex((v) => v.id == id && v.id == userId);
    if (index !== -1) {
      this.BookShelf[index] = BookShelf;
      return BookShelf
    }
    throw new NotFoundException();
  }

  deleteBookShelf(id: number, userId: number): void {
    this.BookShelf = this.BookShelf.filter((BookShelf) => BookShelf.id != id && BookShelf.userId == userId);
  }
}