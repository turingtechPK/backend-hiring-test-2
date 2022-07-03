import { ApiProperty } from "@nestjs/swagger"
import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript"
import { TransactionHistory } from "./trasactionHistory.entity"
import { Users } from "./users.entity"


@Table({
    timestamps : true,
})
export class Accounts extends Model{

    @ApiProperty({ example: 1 })
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    accountNumber : number

    @ApiProperty({ example: 1002.2 })
    @Column({
        type:DataType.FLOAT
    })
    balance:number

    @ApiProperty({ example: 1 })
    @ForeignKey(() => Users)
    @Column
    ownedBy: number
    @BelongsTo(() => Users)
    owner : Users

    @HasMany(()=>TransactionHistory,"senderAccountId")
    senderAccountId:Accounts

    @HasMany(()=>TransactionHistory,"recieverAccountId")
    recieverAccountId:Accounts
    

}