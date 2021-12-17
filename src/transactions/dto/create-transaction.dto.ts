import { IsNotEmpty } from 'class-validator';
import { Account } from 'src/accounts/entities/account.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  sourceAccount: Account['accountNumber'];

  @IsNotEmpty()
  destinationAccount: Account['accountNumber'];

  @IsNotEmpty()
  amount: number;
}
