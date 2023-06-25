import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { Review } from './review.interface';
import { ReviewCreateDto } from './review.dto';

describe('ReviewController', () => {
    let controller: ReviewController;
    let reviewService: ReviewService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReviewController],
            providers: [ReviewService],
        }).compile();

        controller = module.get<ReviewController>(ReviewController);
        reviewService = module.get<ReviewService>(ReviewService);
    });

    describe('getAllReview', () => {
        it('should return an array of all reviews', () => {
            const reviews: Review[] = [
                { id: 1, volumeId: 1, rating: 4, text: 'Very good book to read' },
                { id: 2, volumeId: 2, rating: 5, text: 'Highly recommended' },
            ];

            jest.spyOn(reviewService, 'getAllReview').mockReturnValue(reviews);

            expect(controller.getAllReview()).toEqual(reviews);
        });
    });

    describe('getReviewById', () => {
        it('should return the review with the specified id', () => {
            const review: Review = { id: 1, volumeId: 1, rating: 4, text: 'Very good book to read' };

            jest.spyOn(reviewService, 'getReviewById').mockReturnValue(review);

            expect(controller.getReviewById(1)).toEqual(review);
        });
    });

    describe('getReviewByVolumeId', () => {
        it('should return an array of reviews for the specified volume id', () => {
            const reviews: Review[] = [
                { id: 1, volumeId: 1, rating: 4, text: 'Very good book to read' },
                { id: 2, volumeId: 1, rating: 5, text: 'Highly recommended' },
            ];

            jest.spyOn(reviewService, 'getReviewByVolumeId').mockReturnValue(reviews);

            expect(controller.getReviewByVolumeId(1)).toEqual(reviews);
        });
    });

    describe('createReview', () => {
        it('should create a new review', () => {
            const createReviewDto: ReviewCreateDto = {
                volumeId: 1,
                rating: 4,
                text: 'Very good book to read',
            };
            const createdReview: Review = {
                id: 1,
                volumeId: 1,
                rating: 4,
                text: 'Very good book to read',
            };
            jest.spyOn(reviewService, 'getAllReview').mockReturnValue([]);
            jest.spyOn(reviewService, 'createReview').mockReturnValue(createdReview);
            expect(controller.creatReviewr(createReviewDto)).toEqual(createdReview);
        });
    });

    describe('updateReview', () => {
        it('should update the review with the specified id', () => {
            const updatedReview: Review = {
                id: 1,
                volumeId: 1,
                rating: 5,
                text: 'Excellent book',
            };
            jest.spyOn(reviewService, 'updateReview').mockReturnValue(updatedReview);
            expect(controller.updateReview(1, updatedReview)).toEqual(updatedReview);
        });
    });

    describe('deleteReview', () => {
        it('should delete the review with the specified id', () => {
            const reviewId = 1;
            expect(() => {
                controller.deleteReview(reviewId);
            }).not.toThrow();
        });
    });
});