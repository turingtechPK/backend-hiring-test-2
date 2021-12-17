import { ApiProperty } from '@nestjs/swagger';
import { Customer } from 'src/customers/entities/customer.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  accountNumber: number;

  @ApiProperty()
  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'customerId' })
  customerId: Customer['id'];

  @OneToMany(() => Transaction, (transaction) => transaction.transactionId)
  transactions: Transaction['transactionId'];

  @ApiProperty()
  @Column({ nullable: false })
  balance: number;
}
