import { Module } from '@nestjs/common';
import { VolumesController } from './volume.controller';
import { VolumesService } from './volume.service';

@Module({
  controllers: [VolumesController],
  providers: [VolumesService],
})
export class VolumesModule {}