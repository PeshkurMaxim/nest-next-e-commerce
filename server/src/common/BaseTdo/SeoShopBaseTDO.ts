import { IsOptional, IsString } from 'class-validator';
import { ShopBaseTDO } from './ShopBaseTDO';

export abstract class SeoShopBaseTDO extends ShopBaseTDO {
  @IsOptional()
  @IsString()
  path: string;

  @IsOptional()
  @IsString()
  h1: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  keywords: string;
}
