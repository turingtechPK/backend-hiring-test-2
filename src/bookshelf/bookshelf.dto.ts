import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class BookShelfCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    volumes: number[];

    @IsNotEmpty()
    @IsBoolean()
    isPrivate: boolean
}