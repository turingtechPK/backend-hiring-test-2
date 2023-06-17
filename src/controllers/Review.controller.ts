import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ReviewService } from '../Review/Review.service';
import { Review } from '../models/Review.model';

/* This is a TypeScript class that defines a RESTful API for CRUD operations on reviews using methods
such as findReviewById, createReview, updateReview, and deleteReview. */
@Controller('reviews')
export class ReviewController {
 /**
  * This is a constructor function that takes in a ReviewService object as a parameter and assigns it
  * to a private readonly property.
  * @param {ReviewService} reviewService - The parameter `reviewService` is of type `ReviewService` and
  * is marked as `readonly`, which means that it cannot be reassigned once it is initialized in the
  * constructor. It is likely that this parameter is being used to inject an instance of the
  * `ReviewService` class into the current class
  */
  constructor(private readonly reviewService: ReviewService) {}

  /* `@Get(':id')` is a decorator that specifies that this method should handle GET requests to the
  endpoint `/reviews/:id`, where `:id` is a dynamic parameter that can be any string. */
  @Get(':id')
  async findReviewById(@Param('id') id: string) {
    return this.reviewService.findById(id);
  }

  /* This is a method in the `ReviewController` class that is decorated with `@Post()`, which means
  that it handles HTTP POST requests to the `/reviews` endpoint. The method takes in a
  `createReview` object in the request body, which is of type `Review`. The `createReview` object is
  then passed to the `create` method of the `reviewService` object, which is an instance of the
  `ReviewService` class. The `create` method is responsible for creating a new review in the
  database and returning the newly created review object. Finally, the method returns the newly
  created review object as the response to the HTTP POST request. */
  @Post()
  async createReview(@Body() createReview: Review) {
    return this.reviewService.create(createReview);
  }

  /* `@Put(':id')` is a decorator that specifies that this method should handle PUT requests to the
  endpoint `/reviews/:id`, where `:id` is a dynamic parameter that can be any string. */
  @Put(':id')
  async updateReview(
    @Param('id') id: string,
    @Body() updateReview: Review,
  ) {
    return this.reviewService.update(id, updateReview);
  }

  /* `@Delete(':id')` is a decorator that specifies that this method should handle DELETE requests to
  the endpoint `/reviews/:id`, where `:id` is a dynamic parameter that can be any string. The
  `deleteReview` method takes in the `id` parameter from the URL using the `@Param` decorator and
  passes it to the `delete` method of the `reviewService` object, which is an instance of the
  `ReviewService` class. The `delete` method is responsible for deleting the review with the
  specified `id` from the database. Finally, the method returns the result of the `delete` method as
  the response to the HTTP DELETE request. */
  @Delete(':id')
  async deleteReview(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
