import { Injectable } from '@nestjs/common';
import { CallbackDto, SubscriptionDto } from './app.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getCrypto(subscriptionData: SubscriptionDto): Promise<object> {
    const response = await fetch(
      'https://rest.cryptoapis.io/blockchain-events/subscriptions/bc243c86-0902-4386-b30d-e6b30fa1f2aa?context=Dnar-Subscriptions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'bed0044453631a2d2321478486e2984674e148ac',
        },
        body: JSON.stringify({
          ...subscriptionData,
        }),
      },
    );
    return response.json();
    return subscriptionData;
  }

  async cryptoApiCallback(res: CallbackDto): Promise<object> {
    console.log(res);
    return res;
  }
}
