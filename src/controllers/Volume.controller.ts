import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { VolumeService } from "src/Volume/Volume.service";

@Controller('volume')
export class VolumeController{
    constructor (private readonly volumeService: VolumeService) {}


} 