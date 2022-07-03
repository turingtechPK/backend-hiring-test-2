import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateAccountRequestDto{
    
    @ApiProperty({example:10000})
    @IsNotEmpty()
    balance:number

    @ApiProperty({example:10})
    @IsNotEmpty()
    @IsNumber()
    ownedBy:number

}