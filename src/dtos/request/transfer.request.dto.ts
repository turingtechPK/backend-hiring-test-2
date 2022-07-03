import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class TransferRequestDto{

    @ApiProperty({description:'Sender Account number as integer number',example:12,minimum:1,type:Number})
    @IsNotEmpty()
    senderAccNo:number

    @ApiProperty({description:'Reciever Account number as integer number',example:12,minimum:1,type:Number})
    @IsNotEmpty()
    recieverAccNo:number

    @ApiProperty({description:'Amount you want to transfer',example:112.5})
    @IsNotEmpty()
    amount:number

}