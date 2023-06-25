import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class VolumeCreateDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    author: string;
}