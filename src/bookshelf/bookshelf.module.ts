import { Module } from '@nestjs/common';
import { BookShelfController } from './bookshelf.controller';
import { BookShelfService } from './bookshelf.service';

@Module({
  controllers: [BookShelfController],
  providers: [BookShelfService],
})
export class BookShelfModule {}