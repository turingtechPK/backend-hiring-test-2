// review.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewSchema } from '../models/review.model';
import { ReviewController } from '../controllers/review.controller';
import { ReviewService } from './review.service';

/* This is a module class for handling reviews, which imports a Mongoose schema and provides a
controller and service for managing reviews. */
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
