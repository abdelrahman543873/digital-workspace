import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
