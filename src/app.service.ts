import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(@Res() res): string {

    return res.status(200).send({ ping: 'pong' });
  }
}