import { Injectable, NotFoundException } from '@nestjs/common';
import { Volume } from '../models/Volume.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

/* This is a TypeScript class for a VolumeService that uses the InjectModel decorator to inject a
Volume model. */
@Injectable() 
export class VolumeService{

    /**
     * This is a constructor function that injects a model for a Volume object using the @InjectModel
     * decorator in TypeScript.
     * @param bookshelfModel - The `bookshelfModel` parameter is an instance of the `Model` class from
     * the `@nestjs/mongoose` package. It is used to interact with the MongoDB database and perform
     * CRUD operations on the `Volume` collection. The `@InjectModel('Volume')` decorator is used to
     * inject
     */
    constructor( 
        @InjectModel('Volume') private readonly bookshelfModel: Model<Volume>
        ) {}
    
}