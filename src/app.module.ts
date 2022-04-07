import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [ConfigModule.forRoot(), CurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
