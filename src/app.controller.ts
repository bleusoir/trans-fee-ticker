import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
  ) {
  }

  @Get()
  getHealth(@Res() res): string {
    const API_TOKEN = this.config.get('UPBIT_API_TOKEN');
    log(API_TOKEN);
    return this.appService.getHealth(res);
  }
}