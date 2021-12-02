import { IsMongoId, IsOptional } from 'class-validator';

export class DeleteUserInput {
  @IsOptional()
  @IsMongoId()
  userId?: string;
}
