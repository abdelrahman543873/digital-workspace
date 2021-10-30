import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class Pagination {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @IsOptional()
  @ApiProperty({
    default: 0,
    description:
      'number of skipped pages , number of skipped elements = offset * limit ',
  })
  @Type(() => Number)
  @IsNumber()
  offset?: number = 0;

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @IsOptional()
  @ApiProperty({
    default: 15,
    description: 'max number of elements per page',
  })
  @Type(() => Number)
  @IsNumber()
  limit?: number = 15;
}
