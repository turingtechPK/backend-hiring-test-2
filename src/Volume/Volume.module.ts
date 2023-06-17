import { Module } from '@nestjs/common';
import { VolumeController } from './Volume.controller';
import { VolumeService } from './Volume.service';


/* This is a TypeScript module that exports a VolumeModule class with a VolumeController controller and
a VolumeService provider. */
@Module({
    controllers: [VolumeController],
    providers: [VolumeService]
})
export class VolumeModule {}