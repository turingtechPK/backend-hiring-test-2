import { ApiProperty } from "@nestjs/swagger"
import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table, Unique } from "sequelize-typescript"
import { Accounts } from "./accounts.entity"
@Table({
    timestamps : true,
})
export class Users extends Model{

    @ApiProperty({example:1 })
    @PrimaryKey
    @AutoIncrement
    @Unique
    @Column
    id : number

    @ApiProperty({ example:"Rhonda Church" })
    @Column
    name : string

    @HasMany(() => Accounts)
    userAccounts : Accounts[]
}