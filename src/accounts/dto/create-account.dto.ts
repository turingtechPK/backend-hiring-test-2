import { IsNotEmpty } from 'class-validator';
import { Customer } from 'src/customers/entities/customer.entity';

export class CreateAccountDto {
  @IsNotEmpty()
  customerId: Customer;

  @IsNotEmpty()
  balance: number;
}
