import { Injectable, NotFoundException } from '@nestjs/common';
import { Volume } from './volume.interface';

@Injectable()
export class VolumesService {
  private volumes: Volume[] = [];

  getAllVolumes(): Volume[] {
    return this.volumes;
  }

  getVolumeById(id: number): Volume {
    return this.volumes.find((volume) => volume.id == id);
  }

  createVolume(volume: Volume): Volume {
    this.volumes.push(volume);
    return volume;
  }

  updateVolume(id: number, volume: Volume): Volume {
    const index = this.volumes.findIndex((v) => v.id === id);
    if (index !== -1) {
      this.volumes[index] = volume;
      return volume
    }
    throw new NotFoundException();
  }

  deleteVolume(id: number): void {
    this.volumes = this.volumes.filter((volume) => volume.id !== id);
  }
}