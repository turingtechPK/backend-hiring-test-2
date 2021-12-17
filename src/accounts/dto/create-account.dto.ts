import { Customer } from 'src/customers/entities/customer.entity';

export class CreateAccountDto {
  accountNumber: string;
  customerId: Customer;
  balance: number;
}
