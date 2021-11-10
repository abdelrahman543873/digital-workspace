import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageController } from './page.controller';
import { PageRepository } from './page.repository';
import { PageService } from './page.service';
import { Page, PageSchema } from './schema/page.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [PageController],
  providers: [PageService, PageRepository],
})
export class PageModule {}
