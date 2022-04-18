import { Injectable, Logger } from '@nestjs/common';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ExchangeService {
  constructor(private httpService: HttpService) {
  }

  private readonly KRWUSD_URL = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';
  private readonly logger = new Logger(ExchangeService.name);

  create(createExchangeDto: CreateExchangeDto) {
    return 'This action adds a new exchange';
  }

  @Cron('0 * 9-20 * * *')
  async getExchangeTask() {
    this.logger.debug('executed!');

    return await lastValueFrom(this.httpService.get(this.KRWUSD_URL).pipe(map(res => res.data)));
  }

  findAll() {
    return `This action returns all exchange`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exchange`;
  }

  update(id: number, updateExchangeDto: UpdateExchangeDto) {
    return `This action updates a #${id} exchange`;
  }

  remove(id: number) {
    return `This action removes a #${id} exchange`;
  }
}
