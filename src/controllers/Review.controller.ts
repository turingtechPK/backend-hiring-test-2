import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ReviewService } from '../Review/Review.service';
import { Review } from '../models/Review.model';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':id')
  async findReviewById(@Param('id') id: string) {
    return this.reviewService.findById(id);
  }

  @Post()
  async createReview(@Body() createReview: Review) {
    return this.reviewService.create(createReview);
  }

  @Put(':id')
  async updateReview(
    @Param('id') id: string,
    @Body() updateReview: Review,
  ) {
    return this.reviewService.update(id, updateReview);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
