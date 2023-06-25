import { Injectable } from '@nestjs/common';
import { Position } from './position.interface';

@Injectable()
export class PositionService {
  private position: Position[] = [];

  getAllPosition(): Position[] {
    return this.position;
  }

  getPositionByVolumeId(id: number, userId: number): Position {
    return this.position.find((position) => position.volumeId == id && position.userId == userId);
  }

  createPosition(position: Position): Position {
    let index = this.position.findIndex(v => v.volumeId == position.volumeId && v.userId == position.userId)
    if (index !== -1) {
      this.position[index] = position;
    } else {
      this.position.push(position);
    }
    return position;
  }

}