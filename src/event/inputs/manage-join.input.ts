import { IsMongoId } from 'class-validator';

export class ManageJoinEventInput {
  @IsMongoId()
  eventId: string;
}
