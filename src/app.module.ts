import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { MongooseModule } from '@nestjs/mongoose'
import { VolumeModule} from './Volume/Volume.module'

/* This is a module class in a TypeScript application that imports no modules, has an AppController and
an AppService as providers. */
@Module({
  imports: [VolumeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
