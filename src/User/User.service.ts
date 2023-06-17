import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { Model } from 'mongoose';
import { User } from '../models/User.model';

/* The UserService class provides methods for user signup and login using a User model in a TypeScript
application. */
@Injectable()
export class UserService {

  /**
   * This is a constructor function that injects a User model into the class using the @InjectModel
   * decorator.
   * @param userModel - The userModel parameter is an instance of the Mongoose Model class for the User
   * model. It is used to perform database operations on the User collection, such as creating,
   * updating, deleting, and querying user documents. The @InjectModel decorator is used to inject the
   * User model into the constructor using dependency injection
   */
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}


  /**
   * This is an async function that creates a new user with specified details and saves it to the
   * database.
   * @param {string} userName - A string representing the username of the user being signed up.
   * @param {string} password - A string representing the password for the new user account.
   * @param {string} firstName - A string representing the first name of the user being signed up.
   * @param {string} lastName - The parameter `lastName` is a string that represents the last name of
   * the user being signed up.
   * @param {'admin' | 'user'} accountType - The accountType parameter is a string that can only have
   * two possible values: 'admin' or 'user'. It is used to specify the type of account that the user is
   * creating.
   * @returns a Promise that resolves to a User object.
   */
  async signup(
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
    accountType: 'admin' | 'user',
  ): Promise<User> {
    const newUser = new this.userModel({
      username : userName,
      password : password,
      firstName : firstName,
      lastName : lastName,
      accountType : accountType
    });

    return await newUser.save();
  }

  /**
   * This is an async function that takes in a username and password, checks if the user exists and if
   * the password is correct, and returns the user object if successful or throws an
   * UnauthorizedException if not.
   * @param {string} userName - A string representing the username of the user trying to log in.
   * @param {string} password - The password parameter is a string that represents the password entered
   * by the user during the login process.
   * @returns a Promise that resolves to a User object.
   */
  async login(userName: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ userName });

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
    
}