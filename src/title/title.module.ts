import { TitleRepository } from './title.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TitleController } from './title.controller';
import { TitleService } from './title.service';
import { UniqueTitleName } from './validators/unique-title-name.validator';
import { ExistingTitleId } from './validators/existing-title-id.validator';
import { Title, TitleSchema } from './schema/title.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Title.name, schema: TitleSchema }]),
  ],
  controllers: [TitleController, TitleController],
  providers: [
    TitleService,
    TitleRepository,
    UniqueTitleName,
    ExistingTitleId,
    TitleService,
  ],
})
export class TitleModule {}
