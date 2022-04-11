import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { log } from 'console';

// noinspection JSUnusedLocalSymbols
@Injectable()
export class CurrencyService {
  constructor(private httpService: HttpService) {
  }

  create(createCurrencyDto: CreateCurrencyDto) {
    return 'This action adds a new currency';
  }

  findAll() {
    return `This action returns all currency`;
  }

  async findTicker(id: string) {

    const makedUrl = `https://api.upbit.com/v1/ticker?markets=${id}`;
    const data = await lastValueFrom(this.httpService.get(makedUrl).pipe(
      map(res => res.data),
    ));

    log(data[0]);
    return data[0].trade_price;
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return `This action updates a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}