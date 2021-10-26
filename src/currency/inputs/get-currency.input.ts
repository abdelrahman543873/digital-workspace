import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class GetCurrencyInput {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  amount: number;

  @IsString()
  @IsNotEmpty()
  base: string;
}
