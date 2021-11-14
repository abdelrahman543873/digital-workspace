import { IsMongoId, IsOptional } from 'class-validator';

export class GetStatsInput {
  @IsOptional()
  @IsMongoId()
  userId?: string;
}
