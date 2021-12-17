import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/accounts/entities/account.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @OneToMany(() => Account, (account) => account.customerId)
  accounts: Account[];
}
