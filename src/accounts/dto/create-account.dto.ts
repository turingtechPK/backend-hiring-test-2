import { IsNotEmpty, IsNumber } from 'class-validator';
import { Customer } from 'src/customers/entities/customer.entity';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  customerId: Customer['id'];

  @IsNotEmpty()
  @IsNumber()
  balance: number;
}
