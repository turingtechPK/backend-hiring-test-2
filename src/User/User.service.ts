import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'; 
import { Model } from 'mongoose';
import { User } from '../models/User.model';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) {}


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

    async login(userName: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ userName });
    
        if (!user || user.password !== password) {
          throw new UnauthorizedException('Invalid credentials');
        }
    
        return user;
    }
    
}