import { HttpStatus } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Users } from "src/db/entities/users.entity"

export class RegisterUserResponseDto{
    @ApiProperty({ example: HttpStatus.CREATED})
    statusCode:number
    @ApiProperty({ example: "User created successfully" })
    message:string
    @ApiProperty({ type: Users })
    user:Users
    constructor(statusCode:number,message:string,respnose:Users){
        this.statusCode=statusCode
        this.message=message
        this.user=respnose
    }
}