import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { TransactionHistory } from "src/db/entities/trasactionHistory.entity"

export class TransferResponseDto{
    @ApiProperty({ example: HttpStatus.CREATED })
    statusCode:number
    @ApiProperty({ example: "Transfered successfully" })
    message:string
    @ApiProperty({ type: TransactionHistory})
    transfer:TransactionHistory
    constructor(statusCode:number,message:string,respnose:TransactionHistory){
        this.statusCode=statusCode
        this.message=message
        this.transfer=respnose
    }
}