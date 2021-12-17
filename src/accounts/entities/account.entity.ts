import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Account {
  @PrimaryGeneratedColumn()
  accountNumber: number;

  // TODO(thatdevsherry): Create relationship
  @Column()
  customerId: number;
}
