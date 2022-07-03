import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";
import { PaginatedRequestDto } from "./paginated.request.dto";

export class GetTransferHistoryRequestDto extends PaginatedRequestDto{

    @ApiProperty({example:3456})
    @IsNotEmpty()
    @IsNumberString()
    accNo:string

}