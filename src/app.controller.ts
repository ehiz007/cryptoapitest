import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CallbackDto, SubscriptionDto } from './app.dto';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/cryptoapisverifydomain')
  verifyCryptoApi(@Res() res: Response) {
    const filePath = path.join(__dirname, '../', 'cryptoapisverifydomain.txt');
    const fileName = 'cryptoapisverifydomain.txt';
    const fileStream = fs.createReadStream(filePath);

    res.set({
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename=${fileName}`,
    });

    fileStream.pipe(res);
  }

  @Get('/check-health')
  @HttpCode(200)
  checkHealth(): string {
    return 'ok';
  }

  @Post('crypto')
  getcryptoApi(@Body() subscriptionData: SubscriptionDto): Promise<object> {
    return this.appService.getCrypto(subscriptionData);
  }

  @Post('dnar-tx')
  @HttpCode(200)
  cryptoApiCallback(@Body() callbackData: CallbackDto): Promise<object> {
    return this.appService.cryptoApiCallback(callbackData);
  }
}
