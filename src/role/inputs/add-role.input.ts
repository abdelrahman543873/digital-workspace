import { IsNotEmpty, IsString } from 'class-validator';

export class AddRoleInput {
  @IsString()
  @IsNotEmpty()
  name: string;
}
