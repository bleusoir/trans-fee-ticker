import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CurrencyModule } from './currency/currency.module';
import { DatabaseModule } from './database/database.module';
import { ExchangeModule } from './exchange/exchange.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CurrencyModule,
    DatabaseModule,
    ExchangeModule,
    ScheduleModule.forRoot(),
    TransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}