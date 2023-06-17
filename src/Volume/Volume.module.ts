import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VolumeSchema } from '../models/Volume.model'
import { VolumeService } from './Volume.service';
import { VolumeController } from '../controllers/Volume.controller';

/* This is a module class that imports a Mongoose schema for a "Volume" model and provides a controller
and service for it. */
@Module({
    imports: [MongooseModule.forFeature([{name: 'Volume', schema: VolumeSchema}])],
    controllers: [VolumeController],
    providers: [VolumeService]
})
export class VolumeModule {}