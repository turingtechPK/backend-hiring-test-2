import { Test, TestingModule } from '@nestjs/testing';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { Position } from './position.interface';
import { PositionCreateDto } from './position.dto';

describe('PositionController', () => {
    let controller: PositionController;
    let positionService: PositionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PositionController],
            providers: [PositionService],
        }).compile();

        controller = module.get<PositionController>(PositionController);
        positionService = module.get<PositionService>(PositionService);
    });

    describe('getPositionById', () => {
        it('should return the position for the specified volume and user', () => {
            const volumeId = 1;
            const userId = 1;
            const position: Position = { volumeId, userId, position: 5 };
            jest.spyOn(positionService, 'getPositionByVolumeId').mockReturnValue(position);
            expect(controller.getPositionById(userId, volumeId)).toEqual(position);
        });
    });

    describe('createPosition', () => {
        it('should create a new position for the specified user and volume', () => {
            const userId = 1;
            const positionDto: PositionCreateDto = { volumeId: 1, position: 10 };
            const createdPosition: Position = { volumeId: 1, userId, position: 10 };
            jest.spyOn(positionService, 'createPosition').mockReturnValue(createdPosition);
            expect(controller.createPosition(userId, positionDto)).toEqual(createdPosition);
        });
    });
});