import { Injectable } from '@nestjs/common';
import { Review } from './review.interface';

@Injectable()
export class ReviewService {
  private review: Review[] = [];

  getAllReview(): Review[] {
    return this.review;
  }

  getReviewById(id: number): Review {
    return this.review.find((review) => review.id == id);
  }

  getReviewByVolumeId(id: number) {
    return this.review.filter(r => r.volumeId == id)
  }

  createReview(review: Review): Review {
    this.review.push(review);
    return review;
  }

  updateReview(id: number, review: Review): Review {
    const index = this.review.findIndex((v) => v.id === id);
    if (index !== -1) {
      this.review[index] = review;
    }
    return review;
  }

  deleteReview(id: number): void {
    this.review = this.review.filter((review) => review.id !== id);
  }
}
