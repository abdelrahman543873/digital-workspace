import { IsMongoId } from 'class-validator';

export class DeleteEventInput {
  @IsMongoId()
  eventId: string;
}
