import { Injectable } from '@nestjs/common';

/* The AppService class provides a method that returns the string "Hello World!". */
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
