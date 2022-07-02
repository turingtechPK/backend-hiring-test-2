import { Controller, Get, Post, Body, Param, Put, Res } from '@nestjs/common';
import { CreateCustomerDto, TransferFundsDto } from './dto/dto';
import { CustomerService } from './customer.service';
import { Customer } from './interfaces/customer.interface';
import { Response } from 'express';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Post()
  async create(
    @Body() createCustomer: CreateCustomerDto,
    @Res() res: Response,
  ): Promise<Response> {
    const customer: Customer = { ...createCustomer };
    try {
      const response = await this.customerService.createCustomer(customer);
      return res.send(response);
    } catch (err) {
      return res.send(err);
    }
  }
  @Get('balance/:id')
  async balance(
    @Param('id') id,
    @Res() res: Response,
  ): Promise<Response<any, Record<number, any>>> {
    const response = await this.customerService.getBalance(id);
    return res.send({ balance: response });
  }
  @Get('history/:id')
  async customerTransactionHistory(
    @Param('id') id,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const response = await this.customerService.getHistory(id);
    return res.send({ history: response });
  }
  @Put(':id')
  async transerFunds(
    @Body() transferFundsDto: TransferFundsDto,
    @Param('id') id,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response = await this.customerService.transferFunds(
        id,
        transferFundsDto.payeeId,
        transferFundsDto.amount,
      );
      return res.send(response);
    } catch (err) {
      return res.send(err);
    }
  }
}
