import { Module } from '@nestjs/common';
import { BookshelfController } from './Bookshelf.controller';
import { BookshelfService } from './Bookshelf.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookshelfSchema } from './Bookshelf.model';


/* This is a TypeScript module that exports a BookshelfModule class with a BookshelfController controller and
a BookshelfService provider. */
@Module({
    imports: [MongooseModule.forFeature([{name: 'Bookshelf', schema: BookshelfSchema}])],
    controllers: [BookshelfController],
    providers: [BookshelfService]
})
export class BookshelfModule {}