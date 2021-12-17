import { Account } from 'src/accounts/entities/account.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transactionId: string;

  @ManyToOne(() => Account, (account) => account.accountNumber)
  @JoinColumn({ name: 'sourceAccount' })
  sourceAccount: Account;

  @ManyToOne(() => Account, (account) => account.accountNumber)
  @JoinColumn({ name: 'destinationAccount' })
  destinationAccount: Account;

  @Column()
  amount: number;

  @Column({ nullable: false })
  sourceBalance: number;

  @Column({ nullable: false })
  destinationBalance: number;
}
