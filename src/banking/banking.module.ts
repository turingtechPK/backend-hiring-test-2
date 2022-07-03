import { Module } from '@nestjs/common';
import { ProvidersModule } from 'src/db/providers/providers.module';
// import { EntityModule } from 'src/db/entity.module';
import { BankingController } from './banking.controller';
import { BankingService } from './banking.service';

@Module({
 imports: [ProvidersModule],
  controllers: [BankingController],
  providers: [BankingService],
})
export class BankingModule {}
