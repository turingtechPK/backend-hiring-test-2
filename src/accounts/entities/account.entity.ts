import { ApiProperty } from '@nestjs/swagger';
import { Customer } from 'src/customers/entities/customer.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  accountNumber: string;

  @ApiProperty()
  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'customerId' })
  customerId: Customer;

  @OneToMany(() => Transaction, (transaction) => transaction.transactionId)
  transactions: Transaction[];
}
