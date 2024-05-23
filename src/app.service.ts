import { Injectable } from '@nestjs/common';
import { CallbackDto, SubscriptionDto } from './app.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getCrypto(subscriptionData: SubscriptionDto): Promise<object> {
    // 'https://rest.cryptoapis.io/blockchain-events/subscriptions/bc243c86-0902-4386-b30d-e6b30fa1f2aa?context=Dnar-Subscriptions',
    // const sign = CryptoJS.enc.Base64.stringify(
    //   CryptoJS.HmacSHA256(timeStamp + requestMethod + endpoint + body, OK_ACCESS_SECRET),
    // );
    const { blockchain, network, context } = subscriptionData;
    const response = await fetch(
      `https://rest.cryptoapis.io/blockchain-events/${blockchain}/${network}/subscriptions/address-coins-transactions-confirmed?context=${context}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.ApiKey,
        },
        body: JSON.stringify({
          ...subscriptionData,
        }),
      },
    );
    return response.json();
  }

  async cryptoApiCallback(res: CallbackDto): Promise<object> {
    console.log(res);
    return res;
  }
}
