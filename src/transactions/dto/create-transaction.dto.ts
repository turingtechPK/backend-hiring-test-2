import { IsNotEmpty } from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  sourceAccount: Account;

  @IsNotEmpty()
  destinationAccount: Account;

  @IsNotEmpty()
  amount: number;
}
