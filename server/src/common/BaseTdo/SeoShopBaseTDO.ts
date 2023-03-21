import { IsString } from 'class-validator';
import { ShopBaseTDO } from './ShopBaseTDO';

export abstract class SeoShopBaseTDO extends ShopBaseTDO {
  @IsString()
  path: string;

  @IsString()
  h1: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  keywords: string;
}
