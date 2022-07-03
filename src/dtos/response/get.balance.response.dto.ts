import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"

export class GetBalanceResponseDto{
    @ApiProperty({ example: HttpStatus.OK })
    statusCode:number
    @ApiProperty({ example: "Fetched successfully" })
    message:string
    @ApiProperty({ example: 102.2})
    balance:number
    constructor(statusCode:number,message:string,respnose:number){
        this.statusCode=statusCode
        this.message=message
        this.balance=respnose
    }
}