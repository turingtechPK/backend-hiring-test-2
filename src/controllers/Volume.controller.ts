import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { VolumeService } from "src/Volume/Volume.service";

/* This is a TypeScript class for a VolumeController with a constructor that takes a VolumeService as a
parameter. */
@Controller('volume')
export class VolumeController{
   /**
    * This is a constructor function that takes in a private readonly parameter of type VolumeService.
    * @param {VolumeService} volumeService - The `volumeService` parameter is a private and readonly
    * instance of the `VolumeService` class. It is most likely being injected into the constructor
    * using dependency injection. This allows the class to use the functionality provided by the
    * `VolumeService` class without having to create a new instance of it every time
    */
    constructor (private readonly volumeService: VolumeService) {}
    
} 