import { Pagination } from './../shared/utils/pagination.input';
import { AuthGuard } from './../shared/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ManageLikePageInput } from './inputs/manage-like-page.input';
import { PageService } from './page.service';
import { CreatePageInput } from './inputs/create-page.input';
import { LikedPagesInput } from './inputs/liked-pages.input';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('page')
export class PageController {
  constructor(private pageService: PageService) {}

  @ApiBearerAuth()
  @ApiTags('page')
  @UseGuards(AuthGuard)
  @Put('manageLike')
  async manageLikePage(@Body() input: ManageLikePageInput) {
    return await this.pageService.manageLikePage(input);
  }

  @ApiBearerAuth()
  @ApiTags('page')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('logo'))
  @Put('create')
  async createPage(
    @Body() input: CreatePageInput,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return await this.pageService.createPage(input, logo);
  }

  @ApiBearerAuth()
  @ApiTags('page')
  @UseGuards(AuthGuard)
  @Get('likedPages')
  async getLikedPages(@Query() input: LikedPagesInput) {
    return await this.pageService.getLikedPages(input);
  }

  @ApiBearerAuth()
  @ApiTags('page')
  @UseGuards(AuthGuard)
  @Get('pages')
  async getPages(@Query() pagination: Pagination) {
    return await this.pageService.getPages(pagination);
  }
}
