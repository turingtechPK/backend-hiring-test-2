import { Injectable, NotFoundException } from '@nestjs/common';
import { Volume } from './Volume.model';

/* The VolumeService class is an Injectable service that allows for the insertion of new Volume objects
into an array. */
@Injectable() 
export class VolumeService{

    private Volume: Volume[] = [];

    insertVolume(title: string, author: string, pDate: Date, description: string) {
        const volId = Math.random().toString();
        const newVolume = new Volume(volId, title, author, pDate, description);
        this.Volume.push(newVolume);
        return volId;
    }

    getVolumes(volId: string) {
        const results =  this.Volume.find((vol) => vol.id === volId);
        if (!results){
            throw new NotFoundException('Could not find volume');
        }
        return {...results};
    }
}