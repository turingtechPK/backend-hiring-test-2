import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { CreateAccountRequestDto } from 'src/dtos/request/create.account.request.dto';
import { GetTransferHistoryRequestDto } from 'src/dtos/request/get.transfer.history.request.dto';
import { RegisterUserRequestDto } from 'src/dtos/request/register.user.request.dto';
import { TransferRequestDto } from 'src/dtos/request/transfer.request.dto';
import { CreateAccountResponseDto } from 'src/dtos/response/create.account.response.dto';
import { GetBalanceResponseDto } from 'src/dtos/response/get.balance.response.dto';
import { GetTransferHistoryResponseDto } from 'src/dtos/response/get.transfer.history.response.dto';
import { RegisterUserResponseDto } from 'src/dtos/response/register.user.response.dto';
import { TransferResponseDto } from 'src/dtos/response/transfer.response.dto';
import {  BankingService } from './banking.service';

@Controller("BankingApp")
export class BankingController {
  constructor(private readonly bankingService: BankingService) {}

  
  @ApiOperation({
    summary: 'To Create a new user in this system',
    description: `This api will return an instance of  \`User\` which is created by this api call And this api will
    take name of the user in the request body`,
  })
  @ApiOkResponse({
    description: 'User created successfully',
    type: RegisterUserResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description:
      'If Connection to Database was not able to setup or was interupted, or there was an error in the query',
  })
  @ApiBadRequestResponse({
    description:
      'If the data provided is invalid, such as name is not given'
  })

  @Post('registerUser')
  async registerUser(@Body() body:RegisterUserRequestDto):Promise<RegisterUserResponseDto>{
      return await this.bankingService.registerUser(body)
  }

  
  @ApiOperation({
    summary: 'To Create a new account',
    description: `This api will return an instance of  \`Account\` which is created by this call. And this api will
    take owner id of the account and the initial deposit amount for account`,
  })
  @ApiOkResponse({
    description: 'Account created successfully',
    type: CreateAccountResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description:
      'If Connection to Database was not able to setup or was interupted, or there was an error in the query',
      
  })
  @ApiBadRequestResponse({
    description:
      'If the data provided is invalid, such as name is not given'
  })
  @ApiNotFoundResponse({
    description: 'If giver owner not fonud in database',
  })
  @ApiUnprocessableEntityResponse({
    description: 'If system unable to create account due to some wrong arguments',
  })
  @Post('createAccount')
  async createAccount(@Body() body:CreateAccountRequestDto):Promise<CreateAccountResponseDto>{
    return await this.bankingService.createAccount(body)
  }
  
  @ApiOperation({
    summary: 'To transfer amount from one account to another account',
    description: `This api will return an instance of  \`Transaction History\` which will be created in the end of this api call.
    This api will take sender, reciever account number and amount to be tranfer as and argument`,
  })
  @ApiOkResponse({
    description: 'Tranfered successfully',
    type: TransferResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description:
      'If Connection to Database was not able to setup or was interupted, or there was an error in the query',
  })
  @ApiBadRequestResponse({
    description:
      'If the data provided is invalid, such as senderId is not valid'
  })
  @ApiNotFoundResponse({
    description: 'If given sender or reciever not fonud in database',
  })
  @ApiForbiddenResponse({
    description: 'If sender have insufficient funds',
  })
  @Post('transfer')
  async transfer(@Body() body:TransferRequestDto):Promise<TransferResponseDto>{
    return await this.bankingService.transfer(body)
  }

  @ApiOperation({
    summary: 'To check the current balance of account',
    description: `This api will return \`Current Balance\`. This api will take an account number in param of request`
  })
  @ApiOkResponse({
    description: 'Fetched successfully"',
    type: GetBalanceResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description:
      'If Connection to Database was not able to setup or was interupted, or there was an error in the query',
  })
  @ApiNotFoundResponse({
    description: 'If given account number not found',
  })
  @Get('getBalance/:accNo')
  async getBalance(@Param('accNo') accNo:number):Promise<GetBalanceResponseDto>{
    return await this.bankingService.getBalance(accNo)
  }

  @ApiOperation({
    summary: 'To get the list of transactions against the given account number',
    description: `This api will return \`Transactional History List\`. It will take an argument of account number
    in request query and pagination values to control the size of the response`
  })
  @ApiOkResponse({
    description: 'Fetched successfully"',
    type: GetTransferHistoryResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description:
      'If Connection to Database was not able to setup or was interupted, or there was an error in the query',
  })
  @ApiNotFoundResponse({
    description: 'If transactional history not found against given account number',
  })
  @Get('getTransferHistory')
  async getTransferHistory(@Query() query:GetTransferHistoryRequestDto):Promise<GetTransferHistoryResponseDto>{
    return await this.bankingService.getTransferHistory(query)
  }
}

