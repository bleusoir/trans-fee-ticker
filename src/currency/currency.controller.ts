import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CodesService } from '../codes/codes.service';
import { log } from 'console';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

@Controller('currency')
export class CurrencyController {
  constructor(
    private readonly currencyService: CurrencyService,
    private readonly codeService: CodesService,
  ) {
  }

  @Post()
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  findAll() {
    return this.currencyService.findAll();
  }

  @Get('test')
  async test() {

    const result = [];
    const codes = await this.codeService.findAll();
    for (const code of codes) {

      const index = codes.indexOf(code);
      const curr = await this.currencyService.findTicker(`${code.code}`);
      await sleep(100);

      log(index, code.code, curr);
      result.push(curr);
    }

    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.currencyService.findTicker(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    return this.currencyService.update(+id, updateCurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyService.remove(+id);
  }
}