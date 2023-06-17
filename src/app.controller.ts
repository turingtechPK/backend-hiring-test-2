import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/* The AppController class is a TypeScript controller with a single GET endpoint that returns a string
from the AppService. */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
