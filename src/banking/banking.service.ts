import { ForbiddenException, HttpStatus, Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Accounts } from 'src/db/entities/accounts.entity';
import { TransactionHistory } from 'src/db/entities/trasactionHistory.entity';
import { Users } from 'src/db/entities/users.entity';
import { CreateAccountRequestDto } from 'src/dtos/request/create.account.request.dto';
import { GetTransferHistoryRequestDto } from 'src/dtos/request/get.transfer.history.request.dto';
import { RegisterUserRequestDto } from 'src/dtos/request/register.user.request.dto';
import { TransferRequestDto } from 'src/dtos/request/transfer.request.dto';
import { CreateAccountResponseDto } from 'src/dtos/response/create.account.response.dto';
import { GetBalanceResponseDto } from 'src/dtos/response/get.balance.response.dto';
import { GetTransferHistoryResponseDto } from 'src/dtos/response/get.transfer.history.response.dto';
import { RegisterUserResponseDto } from 'src/dtos/response/register.user.response.dto';
import { TransferResponseDto } from 'src/dtos/response/transfer.response.dto';
import { Op } from 'sequelize';
@Injectable()
export class BankingService {

  constructor(
      @Inject('USERS_REPOSITORY')
      private userRepo:typeof Users,
      @Inject('ACCOUNTS_REPOSITORY')
      private accountRepo:typeof Accounts,
      @Inject('TRANSACTION_HISTORY_REPOSITORY') 
      private transactionHistRepo:typeof TransactionHistory
  ){}

  async registerUser(body:RegisterUserRequestDto){
    const user=await this.userRepo.create({...body})

    if(!user){
      throw new UnprocessableEntityException("Unable to create new user")
    }
    return new RegisterUserResponseDto(HttpStatus.CREATED,"User created successfully",user)
  }

  async createAccount(body:CreateAccountRequestDto){
    const user=await this.userRepo.findOne({where:{id:body.ownedBy}})
    if (!user){
      throw new NotFoundException("User not found")
    }
    const account=await this.accountRepo.create({...body})
    if (!account){
      throw new UnprocessableEntityException("Unable to create account")
    }
    return new CreateAccountResponseDto(HttpStatus.CREATED,"Account created successfully",account)
  }
  
  async transfer(body:TransferRequestDto) {
    const senderAcc=await this.accountRepo.findOne({where:{accountNumber:body.senderAccNo}})
    if (!senderAcc){ // checking is the sender account present or not
      throw new NotFoundException("Sender account not found")
    }
    if (senderAcc.balance<body.amount){ // checking sender have the sufficient funds or not
      throw new ForbiddenException("Sender balance is low")
    }
    const recieverAcc=await this.accountRepo.findOne({where:{accountNumber:body.recieverAccNo}})
    if (!recieverAcc){ // checking reciever account is present or not
      throw new NotFoundException("Reciever Account not found")
    }
    
    // we can use sequilize transaction in this function with all queries below this line (and commit in end)
    // if any of the below transaction failed then we just rollback while using transaction
    senderAcc.balance-=body.amount
    await senderAcc.save()
    recieverAcc.balance+=body.amount
    await recieverAcc.save()

    const transHist=await this.transactionHistRepo.create({
      amount:body.amount,
      senderAccountId:body.senderAccNo,
      recieverAccountId:body.recieverAccNo
    })
    return new TransferResponseDto(HttpStatus.CREATED,'Tranfered successfully',transHist)
  }
  
  async getBalance(accNo:number){
    const acc=await this.accountRepo.findOne({where:{accountNumber:accNo}})
    if (!acc){
      throw new NotFoundException("Account not found")
    }
    return new GetBalanceResponseDto(HttpStatus.OK,"Fetched successfully",acc.balance)
  }

  async getTransferHistory(query:GetTransferHistoryRequestDto){
    let offset = 0;
    query.pageNo = query.pageNo - 1;
    if (query.pageNo) offset = query.limit * query.pageNo;
    const transferHist=await this.transactionHistRepo.findAll({where:{
      [Op.or]: [
        { senderAccountId: parseInt(query.accNo) },
        { recieverAccountId: parseInt(query.accNo) }
      ]
    },
      limit:query.limit,
      offset:offset
    })
    
    if (!transferHist.length){
      throw new NotFoundException("Transfer history not found against that account")
    }
    return new GetTransferHistoryResponseDto(HttpStatus.OK,"Fetched successfully",transferHist)
  
  }
  

}
