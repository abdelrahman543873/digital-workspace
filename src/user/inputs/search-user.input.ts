import { IsNotEmpty, IsString } from 'class-validator';

export class SearchUserInput {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}
