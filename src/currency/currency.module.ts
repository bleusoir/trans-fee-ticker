import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { HttpModule } from '@nestjs/axios';
import { CodesModule } from '../codes/codes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [CurrencyController],
  imports: [ConfigModule, HttpModule.register({
    timeout: 2000,
  }), CodesModule],
  providers: [CurrencyService],
})
export class CurrencyModule {}