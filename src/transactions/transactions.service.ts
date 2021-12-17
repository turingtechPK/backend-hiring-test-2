import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from 'src/accounts/accounts.service';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private accountService: AccountsService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    try {
      const sourceAccount = await this.accountService.findOneOrFail(
        createTransactionDto.sourceAccount,
      );
      const destinationAccount = await this.accountService.findOneOrFail(
        createTransactionDto.destinationAccount,
      );

      if (sourceAccount.balance > createTransactionDto.amount) {
        const transaction = createTransactionDto as Transaction;
        transaction.sourceBalance = sourceAccount.balance;
        transaction.destinationBalance = destinationAccount.balance;
        return this.transactionRepository.save(transaction);
      }
      throw new BadRequestException('Insufficient balance');
    } catch (e: unknown) {
      if (e instanceof EntityNotFoundError) {
        throw new BadRequestException('Account not found');
      } else if (e instanceof BadRequestException) {
        throw e;
      }
    }
  }
}
