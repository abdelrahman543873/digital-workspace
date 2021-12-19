import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PageController } from './page.controller';
import { PageRepository } from './page.repository';
import { PageService } from './page.service';
import { Page, PageSchema } from './schema/page.schema';
import { filename } from '../shared/utils/multer-file-name';

@Module({
  imports: [
    MulterModule.register({
      preservePath: true,
      storage: diskStorage({
        destination: './client/pages',
        filename,
      }),
    }),
    MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),
  ],
  controllers: [PageController],
  providers: [PageService, PageRepository],
})
export class PageModule {}
