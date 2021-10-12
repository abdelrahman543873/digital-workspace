import { IsString } from 'class-validator';

export class AddPostInput {
  @IsString()
  content: string;
}
