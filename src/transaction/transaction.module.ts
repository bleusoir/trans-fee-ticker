import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [HttpModule],
})
export class TransactionModule {}
