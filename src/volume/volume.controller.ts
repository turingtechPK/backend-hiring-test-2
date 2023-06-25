import { Controller, Get, Post, Put, Param, Body, ValidationPipe } from '@nestjs/common';
import { VolumesService } from './volume.service';
import { Volume } from './volume.interface';
import { VolumeCreateDto } from './volume.dto';
import { ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('volume')
export class VolumesController {
    constructor(private readonly volumesService: VolumesService) { }

    @Get()
    @ApiResponse({ status: 200, description: "Get the all volumes" })
    getAllVolumes(): Volume[] {
        return this.volumesService.getAllVolumes();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: "Get the volume by id" })
    getVolumeById(@Param('id') id: number): Volume {
        return this.volumesService.getVolumeById(id);
    }

    @Post()
    @ApiBody({ description: 'Request body', type: VolumeCreateDto, examples: { example: { value: { id: 1, title: 'Harry Potter', author: 'J. K. Rowling' } } } })
    @ApiResponse({ status: 201, description: "Create a volume", schema: { example: { id: 1, title: 'Harry Potter', author: 'J. K. Rowling' } } })
    createVolume(@Body(ValidationPipe) volume: VolumeCreateDto): Volume {
        let id = 1;
        if (this.volumesService.getAllVolumes().length > 0) {
            id = this.volumesService.getAllVolumes()[this.volumesService.getAllVolumes().length - 1].id;
            id++;
        }
        let newVolume: Volume = { ...volume, id: id };
        return this.volumesService.createVolume(newVolume);
    }

    @Put(':id')
    @ApiResponse({ status: 200, description: "update the volume by id" })
    updateVolume(@Param('id') id: number, @Body() volume: Volume): Volume {
        return this.volumesService.updateVolume(id, volume);
    }
}