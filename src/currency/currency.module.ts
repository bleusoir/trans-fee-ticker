import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { HttpModule } from '@nestjs/axios';
import { CodesModule } from '../codes/codes.module';

@Module({
  controllers: [CurrencyController],
  imports: [HttpModule, CodesModule],
  providers: [CurrencyService],
})
export class CurrencyModule {}