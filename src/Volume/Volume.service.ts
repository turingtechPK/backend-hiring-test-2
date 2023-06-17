import { Injectable } from '@nestjs/common';
import { Volume } from './Volume.model';

@Injectable() 
export class VolumeService{

    Volume: Volume[] = [];

    insertVolume(title: string, author: string, pDate: Date, description: string) {
        const volId = new Date().toString();
        const newVolume = new Volume(volId, title, author, pDate, description);
        this.Volume.push(newVolume);
        return volId;
    }

}