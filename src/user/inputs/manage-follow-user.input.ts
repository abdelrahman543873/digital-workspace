import { IsMongoId } from 'class-validator';

export class ManageFollowUserInput {
  @IsMongoId()
  userId: string;
}
