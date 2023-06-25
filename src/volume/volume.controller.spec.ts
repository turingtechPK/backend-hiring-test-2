import { Test, TestingModule } from '@nestjs/testing';
import { VolumesController } from './volume.controller';
import { VolumesService } from './volume.service';
import { Volume } from './volume.interface';
import { VolumeCreateDto } from './volume.dto'

describe('VolumesController', () => {
    let controller: VolumesController;
    let volumesService: VolumesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VolumesController],
            providers: [VolumesService],
        }).compile();
        controller = module.get<VolumesController>(VolumesController);
        volumesService = module.get<VolumesService>(VolumesService);
    });

    describe('getAllVolumes', () => {
        it('should return an array of volumes', () => {
            const volumes: Volume[] = [
                { id: 1, title: 'Book 1', author: 'Author 1' },
                { id: 2, title: 'Book 2', author: 'Author 2' },
            ];
            jest.spyOn(volumesService, 'getAllVolumes').mockReturnValue(volumes);
            expect(controller.getAllVolumes()).toEqual(volumes);
        });
    });

    describe('getVolumeById', () => {
        it('should return the volume with the specified id', () => {
            const volume: Volume = { id: 1, title: 'Book 1', author: 'Author 1' };
            jest.spyOn(volumesService, 'getVolumeById').mockReturnValue(volume);
            expect(controller.getVolumeById(1)).toEqual(volume);
        });
    });

    describe('createVolume', () => {
        it('should create a new volume', () => {
            const createDto: VolumeCreateDto = {
                title: 'New Book',
                author: 'New Author',
            };
            const createdVolume: Volume = {
                id: 1,
                title: 'New Book',
                author: 'New Author',
            };
            jest.spyOn(volumesService, 'getAllVolumes').mockReturnValue([]);
            jest.spyOn(volumesService, 'createVolume').mockReturnValue(createdVolume);
            expect(controller.createVolume(createDto)).toEqual(createdVolume);
        });
    });

    describe('updateVolume', () => {
        it('should update the volume with the specified id', () => {
            const updatedVolume: Volume = {
                id: 1,
                title: 'Updated Book',
                author: 'Updated Author',
            };
            jest.spyOn(volumesService, 'updateVolume').mockReturnValue(updatedVolume);
            expect(controller.updateVolume(1, updatedVolume)).toEqual(updatedVolume);
        });
    });
});
