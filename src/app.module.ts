import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BankingModule } from './banking/banking.module';
import { Connection } from './db/connection';
import { DBModule } from './db/db.module';
import { ProvidersModule } from './db/providers/providers.module';


@Module({
  imports: [   
    DBModule,
    BankingModule

  ],

})
export class AppModule {}
