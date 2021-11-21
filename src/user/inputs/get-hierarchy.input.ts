import { IsMongoId, IsOptional } from 'class-validator';

export class GetHierarchyInput {
  @IsOptional()
  @IsMongoId()
  userId?: string;
}
