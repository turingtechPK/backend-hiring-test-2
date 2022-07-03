import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Accounts } from "src/db/entities/accounts.entity"
import { TransactionHistory } from "src/db/entities/trasactionHistory.entity"

export class GetTransferHistoryResponseDto{
    @ApiProperty({ example: HttpStatus.OK })
    statusCode:number
    @ApiProperty({ example: "Fetched successfully" })
    message:string
    @ApiProperty({ type: TransactionHistory,isArray:true })
    TranferHistory:TransactionHistory[]
    constructor(statusCode:number,message:string,respnose:TransactionHistory[]){
        this.statusCode=statusCode
        this.message=message
        this.TranferHistory=respnose
    }
}