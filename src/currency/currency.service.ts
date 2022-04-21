import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { log } from 'console';
import { sign } from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { encode } from 'querystring';

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
    const {
      createHash,
    } = await import('crypto');
    try {
      const query = encode({
        currency: id,
      });
      const algorithm = 'sha512';
      const hash = createHash(algorithm).update(query, 'utf-8').digest('hex');
      const config = new ConfigService();
      const token = sign({
        access_key: config.get('UPBIT_API_TOKEN'),
        nonce: uuidv4(),
        query_hash: hash,
        query_hash_alg: algorithm,
      }, config.get('UPBIT_API_SECRET'));

      const TICKER_URL = `https://api.upbit.com/v1/ticker?markets=KRW-${id}`;
      const WITHDRAWS_CHANCE_URL = `https://api.upbit.com/v1/withdraws/chance?currency=${id}`;
      const ticker = await lastValueFrom(this.httpService.get(TICKER_URL).pipe(
        map(res => res.data)));

      const withdrawsChance = await lastValueFrom(this.httpService.get(WITHDRAWS_CHANCE_URL, {
        validateStatus: () => true,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).pipe(
        map(res => res.data)));

      log({ withdrawsChanceFee: withdrawsChance.currency.withdraw_fee });

      return {
        ticker: id,
        price: ticker[0].trade_price,
        withdrawFee: withdrawsChance.currency.withdraw_fee,
        calculatedFee: Math.ceil(ticker[0].trade_price * withdrawsChance.currency.withdraw_fee),
      };
    } catch (e) {
      throw e;
    }
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return `This action updates a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}