import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Accounts } from "src/db/entities/accounts.entity"

export class CreateAccountResponseDto{
    
    @ApiProperty({ example: HttpStatus.CREATED })
    statusCode:number
    @ApiProperty({example:"Account created successfully"})
    message:string
    @ApiProperty({ type: Accounts })
    account:Accounts
    constructor(statusCode:number,message:string,respnose:Accounts){
        this.statusCode=statusCode
        this.message=message
        this.account=respnose
    }
}