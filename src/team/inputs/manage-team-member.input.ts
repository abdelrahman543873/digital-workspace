import { IsMongoId } from 'class-validator';

export class AddTeamMemberInput {
  @IsMongoId()
  memberId: string;

  @IsMongoId()
  teamId: string;
}
