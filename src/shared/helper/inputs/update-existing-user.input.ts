import { IsBoolean } from 'class-validator';

export class UpdateExistingUserInput {
  @IsBoolean()
  isVerified?: boolean;
}
