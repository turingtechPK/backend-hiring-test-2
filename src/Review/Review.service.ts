// review.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from '../models/Review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review') private readonly reviewModel: Model<Review>,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findById(id: string): Promise<Review> {
    return this.reviewModel.findById(id).exec();
  }

  async create(createReview: Review): Promise<Review> {
    const createdReview = new this.reviewModel(createReview);
    return createdReview.save();
  }

  async update(id: string, updateReview: Review): Promise<Review> {
    return this.reviewModel.findByIdAndUpdate(id, updateReview, { new: true }).exec();
  }

  async delete(id: string): Promise<Review> {
    return this.reviewModel.findByIdAndRemove(id).exec();
  }
}
