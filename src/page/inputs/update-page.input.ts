import { Allow, IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class UpdatePageInput {
  @IsMongoId()
  pageId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Allow()
  logo: string;
}
