import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { BookshelfModule} from './BookShelf/Bookshelf.module'
import { UserModule } from './User/User.module';

@Module({
  imports: [BookshelfModule, UserModule, MongooseModule.forRoot('mongodb+srv://usamakhatab98:myMongoDB@cluster0.fp5btrj.mongodb.net/books')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
