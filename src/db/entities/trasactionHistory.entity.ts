import { ApiProperty } from "@nestjs/swagger";
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Accounts } from "./accounts.entity";




@Table({
    timestamps : true,
})
export class TransactionHistory extends Model{

    @ApiProperty({ example:1 })
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id : number

    @ApiProperty({ example: 1202.2 })
    @Column({
        type:DataType.FLOAT
    })
    amount:number

    @ApiProperty({ example: 1 })
    @ForeignKey(()=>Accounts)
    @Column
    senderAccountId:number
    @BelongsTo(()=>Accounts,"senderAccountId")
    senderAccount:Accounts

    @ApiProperty({ example: 2 })
    @ForeignKey(()=>Accounts)
    @Column
    recieverAccountId:number
    @BelongsTo(()=>Accounts,"recieverAccountId")
    recieverAccount:Accounts
}
