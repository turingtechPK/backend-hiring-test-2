import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/* The AppController class is a TypeScript controller with a single GET endpoint that returns a string
from the AppService. */
@Controller()
export class AppController {
  /**
   * This is a constructor function that takes an instance of the AppService class as a parameter and
   * assigns it to a private readonly property.
   * @param {AppService} appService - The `appService` parameter is a dependency injection of the
   * `AppService` class. It allows the class that contains this constructor to use the methods and
   * properties of the `AppService` class. The `private readonly` keywords indicate that the
   * `appService` parameter is a private property of the
   */
  constructor(private readonly appService: AppService) {}

  /* `@Get()` is a decorator that specifies that the following method should handle HTTP GET requests.
  `getHello()` is a method that returns a string by calling the `getHello()` method of the
  `AppService` class, which is injected into the `AppController` class through its constructor. When
  a GET request is made to the root URL of the application, this method is called and the string
  returned by `getHello()` is sent as the response. */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
