import { IsNotEmpty, IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class ReviewCreateDto {

    @IsNotEmpty()
    @IsNumber()
    volumeId: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    text: string;
}