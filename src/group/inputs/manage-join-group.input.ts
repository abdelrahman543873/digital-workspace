import { IsMongoId } from 'class-validator';

export class ManageJoinGroupInput {
  @IsMongoId()
  groupId: string;
}
