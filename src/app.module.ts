import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { BookshelfModule} from './BookShelf/Bookshelf.module'

/* This is a module class in a TypeScript application that imports no modules, has an AppController and
an AppService as providers. */
@Module({
  imports: [BookshelfModule, MongooseModule.forRoot('mongodb+srv://usamakhatab98:myMongoDB@cluster0.fp5btrj.mongodb.net/books')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
