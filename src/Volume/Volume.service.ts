import { Injectable, NotFoundException } from '@nestjs/common';
import { Volume } from '../models/Volume.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable() 
export class VolumeService{

    constructor( 
        @InjectModel('Volume') private readonly bookshelfModel: Model<Volume>
        ) {}
    
}