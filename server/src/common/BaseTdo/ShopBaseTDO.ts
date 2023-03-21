import { IsString } from 'class-validator';

export abstract class ShopBaseTDO {
  @IsString()
  name: string;
}
