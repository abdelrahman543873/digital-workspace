import { IsMongoId } from 'class-validator';

export class GetUserByIdInput {
  @IsMongoId()
  id: string;
}
