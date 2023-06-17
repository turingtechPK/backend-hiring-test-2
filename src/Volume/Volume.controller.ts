import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { VolumeService } from "./Volume.service";

/* This is a TypeScript class that defines a controller for adding volumes with specific properties to
a volume service. */
@Controller('volumes')
export class VolumeController{
    constructor (private readonly volumeService: VolumeService) {}

    @Post()
    addVolume(
        @Body('title') volTitle: string, 
        @Body('author') volAuthor: string, 
        @Body('publishedDate') pubDate: Date, 
        @Body('description') volDesc: string) : any {

            const generatedId = this.volumeService.insertVolume(volTitle, volAuthor, pubDate, volDesc);
            return {id: generatedId}; 
    }

    @Get(':id')
    getVolumes(@Param('id') volId: string) {
        return this.volumeService.getVolumes(volId);
    }
} 