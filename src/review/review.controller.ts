import { Controller, Get, Post, Put, Delete, Param, Body, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { Review } from './review.interface';
import { ReviewCreateDto } from './review.dto';
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';

@Controller('review')
export class ReviewController {
  constructor(private readonly ReviewService: ReviewService) { }

  @Get()
  @ApiResponse({ status: 200, description: "Get all reviews" })
  getAllReview(): Review[] {
    return this.ReviewService.getAllReview();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: "Get the review by id" })
  getReviewById(@Param('id') id: number): Review {
    return this.ReviewService.getReviewById(id);
  }

  @Get('volume/:id')
  @ApiResponse({ status: 200, description: "Get the reviews of a single volume by volume id" })
  getReviewByVolumeId(@Param('id') id: number): Review[] {
    return this.ReviewService.getReviewByVolumeId(id);
  }

  @Post()
  @ApiHeader({ name: 'userId', description: 'Id of current user', required: true })
  @ApiBody({
    description: 'Request body', type: ReviewCreateDto, examples: {
      example: {
        value:
          { volumeId: 1, rating: 4, text: 'Very good book to read' }
      }
    }
  })
  @ApiResponse({
    status: 201, description: "Create a review", schema: {
      example: { volumeId: 1, rating: 4, text: 'Very good book to read' }
    }
  })
  creatReviewr(@Body(ValidationPipe) review: ReviewCreateDto): Review {
    let id = 1;
    if (this.ReviewService.getAllReview().length > 0) {
      id = this.ReviewService.getAllReview()[this.ReviewService.getAllReview().length - 1].id;
      id++;
    }
    let newReview: Review = { ...review, id: id };
    return this.ReviewService.createReview(newReview);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: "update the review by id" })
  updateReview(@Param('id') id: number, @Body() review: Review): Review {
    return this.ReviewService.updateReview(id, review);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: "delete the review by id" })
  deleteReview(@Param('id') id: number): void {
    this.ReviewService.deleteReview(id);
  }
}