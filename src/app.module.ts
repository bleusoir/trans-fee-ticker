import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CurrencyModule } from './currency/currency.module';
import { DatabaseModule } from './database/database.module';
import { CodesModule } from './codes/codes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CurrencyModule,
    DatabaseModule,
    CodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}