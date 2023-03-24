import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

enum findOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FindDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  public limit: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  public offset: number;

  @IsOptional()
  public sort: string;

  @IsOptional()
  @IsEnum(findOrder)
  public order: 'ASC' | 'DESC';
}
