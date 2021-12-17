import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private readonly customerService: CustomersService,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    try {
      const customer = await this.customerService.findOne(
        createAccountDto.customerId,
      );
      if (customer.id === createAccountDto.customerId) {
        return this.accountRepository.save(createAccountDto);
      }
    } catch (error) {
      throw new BadRequestException(
        `No customer with ID: ${createAccountDto.customerId}`,
      );
    }
  }

  findAll() {
    return this.accountRepository.find();
  }

  findOne(id: number) {
    return this.accountRepository.findOne(id);
  }
}
