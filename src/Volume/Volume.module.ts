import { Module } from '@nestjs/common';
import { VolumeController } from './Volume.controller';
import { VolumeService } from './Volume.service';


@Module({
    controllers: [VolumeController],
    providers: [VolumeService]
})
export class VolumeModule {}