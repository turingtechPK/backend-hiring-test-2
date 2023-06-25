import { IsNotEmpty, IsNumber } from 'class-validator';

export class PositionCreateDto {
    @IsNotEmpty()
    @IsNumber()
    volumeId: number;

    @IsNotEmpty()
    @IsNumber()
    position: number;
}