import { Injectable, Logger } from '@nestjs/common';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exchange } from './entities/exchange.entity';

@Injectable()
export class ExchangeService {
  constructor(private httpService: HttpService,
              @InjectRepository(Exchange) private exchangeRepository: Repository<Exchange>) {
  }

  private readonly KRWUSD_URL = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';
  private readonly logger = new Logger(ExchangeService.name);

  create(createExchangeDto: CreateExchangeDto) {
    return 'This action adds a new exchange';
  }

  @Cron('0 * 9-20 * * *')
  async getExchangeTask() {
    this.logger.debug('executed!');

    const exchangeJson = await lastValueFrom(this.httpService.get(this.KRWUSD_URL).pipe(map(res => res.data)));

    this.logger.debug({ exchangeJson });

    const saveResult = await this.exchangeRepository.save({
      id: null,
      code: exchangeJson[0].code,
      price: exchangeJson[0].basePrice,
      trade_time: `${exchangeJson[0].date} ${exchangeJson[0].time}`,
    });

    this.logger.debug({ saveResult });

    return saveResult;
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
