import { Controller, Get, Post, Param, Body, ValidationPipe, Headers } from '@nestjs/common';
import { PositionService } from './position.service';
import { Position } from './position.interface';
import { PositionCreateDto } from './position.dto';
import { ApiHeader, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) { }

  @Get(':id')
  @ApiHeader({ name: 'userId', description: 'Id of current user', required: true })
  @ApiResponse({status: 200, description:"Get the reading position by volume id and by current user"})
  getPositionById(@Headers('userId') userId: number, @Param('id') id: number): Position {
    return this.positionService.getPositionByVolumeId(id, userId);
  }

  @Post()
  @ApiHeader({ name: 'userId', description: 'Id of current user', required: true })
  @ApiBody({
    description: 'Request body', type: PositionCreateDto, examples: {
      example: {
        value: {
          "volumeId": 1,
          "position": 1
        }
      }
    }
  })
  @ApiResponse({
    status: 201, description: "Create a reading position", schema: {
      example: {
        "volumeId": 1,
        "position": 1,
        "userId": '1'
      }
    }
  })
  createPosition(@Headers('userId') userId: number, @Body(ValidationPipe) position: PositionCreateDto): Position {
    let newPosition: Position = { ...position, userId };
    return this.positionService.createPosition(newPosition);
  }

}