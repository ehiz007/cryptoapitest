import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CallbackDto, SubscriptionDto } from './app.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
