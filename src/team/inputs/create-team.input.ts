import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
