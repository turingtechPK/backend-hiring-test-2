import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RegisterUserRequestDto{
    @ApiProperty({example:"Rhonda Church"})
    @IsNotEmpty()
    @IsString()
    name:string
}