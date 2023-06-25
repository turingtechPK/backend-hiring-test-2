import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private User: User[] = [];

  getAllUser(): User[] {
    return this.User;
  }

  getUserById(id: number): User {
    return this.User.find((User) => User.id === id);
  }

  createUser(User: User): User {
    this.User.push(User);
    return User;
  }

  updateUser(id: number, User: User): User {
    const index = this.User.findIndex((v) => v.id == id);
    console.log(index)
    if (index !== -1) {
      this.User[index] = User;
      return User;
    }
    throw new NotFoundException();
  }

  deleteUser(id: number): void {
    this.User = this.User.filter((User) => User.id !== id);
  }
}