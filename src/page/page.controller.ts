import { Pagination } from './../shared/utils/pagination.input';
import { AuthGuard } from './../shared/guards/auth.guard';
import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ManageLikePageInput } from './inputs/manage-like-page.input';
import { PageService } from './page.service';
import { CreatePageInput } from './inputs/create-page.input';

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
  @Put('create')
  async createPage(@Body() input: CreatePageInput) {
    return await this.pageService.createPage(input);
  }

  @ApiBearerAuth()
  @ApiTags('page')
  @UseGuards(AuthGuard)
  @Get('likedPages')
  async getLikedPages(@Query() pagination: Pagination) {
    return await this.pageService.getLikedPages(pagination);
  }

  @ApiBearerAuth()
  @ApiTags('page')
  @UseGuards(AuthGuard)
  @Get('pages')
  async getPages(@Query() pagination: Pagination) {
    return await this.pageService.getPages(pagination);
  }
}
