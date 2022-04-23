import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
  ) {
  }

  @Get()
  getHealth(@Res() res): string {
    return this.appService.getHealth(res);
  }
}