import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrencyModule } from './currency/currency.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';

const DB_TYPE = env.DB_TYPE,
  DB_HOST = env.DB_HOST,
  DB_PORT = env.DB_PORT,
  DB_USER = env.DB_USER,
  DB_PASS = env.DB_PASS,
  DB_NAME = env.DB_NAME;

@Module({
  imports: [
    ConfigModule.forRoot(),
    CurrencyModule,
    TypeOrmModule.forRoot({
      type: DB_TYPE,
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly config: ConfigService
  ) {
  }
}