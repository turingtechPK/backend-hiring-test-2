import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VolumeSchema } from '../models/Volume.model'
import { VolumeService } from './Volume.service';
import { VolumeController } from '../controllers/Volume.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Volume', schema: VolumeSchema}])],
    controllers: [VolumeController],
    providers: [VolumeService]
})
export class VolumeModule {}