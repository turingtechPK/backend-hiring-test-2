import { Controller, Post, Body } from "@nestjs/common";
import { VolumeService } from "./Volume.service";

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
} 