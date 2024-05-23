import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class Item {
  @IsString()
  blockchain: string;
  @IsString()
  network: string;
  @IsString()
  address: string;
  minedInBlock: {
    height: number;
    hash: string;
    timestamp: number;
  };
  transactionId: string;
  currentConfirmations: number;
  targetConfirmations: number;
  amount: number | string;
  unit: string;
  direction: string;
}

class Data {
  @IsString()
  product: string; //**Specifies the product for which the event occurs.**
  @IsString()
  event: string; //**Specifies the actual event type, for which the callback subscription was made.
  @Type(() => Item)
  @ValidateNested()
  item: Item;
}

export class CallbackDto {
  @IsString()
  apiVersion: string; //**Represents the current Crypto APIa version, which is v2.**
  @IsString()
  referenceId: string; //**Represents the unique reference identifier of the callback.**
  @IsString()
  idempotencyKey: string; //**Specifies a unique ID used by Crypto APIs to recognize consecutive requests with the same data so that not to perform the same operation twice.**
  @Type(() => Data)
  @ValidateNested()
  data: Data;
}

export class SubscriptionDto {
  @IsString()
  context: string;
  @ValidateNested()
  data: {
    item: {
      address: string;
      allowDuplicates?: boolean;
      callbackSecretKey: string;
      callbackUrl: string;
      confirmationsCount: number;
      receiveCallbackOn: number;
    };
  };
}
