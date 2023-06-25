import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VolumesModule } from './volume/volume.module';
import { BookShelfModule } from './bookshelf/bookshelf.module';
import { UserModule } from './user/user.module';
import { PositionModule } from './position/position.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [VolumesModule, BookShelfModule, UserModule, PositionModule, ReviewModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
