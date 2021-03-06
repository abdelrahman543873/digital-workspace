import { FileCloudUploadInterceptor } from './../shared/interceptors/file-cloud-upload.interceptor';
import { Pagination } from './../shared/utils/pagination.input';
import { AuthGuard } from './../shared/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ManageLikePageInput } from './inputs/manage-like-page.input';
import { PageService } from './page.service';
import { CreatePageInput } from './inputs/create-page.input';
import { LikedPagesInput } from './inputs/liked-pages.input';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePageSwagger } from './swagger/create-page.swagger';
import { DeletePageInput } from './inputs/delete-page.input';
import { SearchPageInput } from './inputs/search-page.input';
import { UpdatePageSwagger } from './swagger/update-page.swagger';
import { UpdatePageInput } from './inputs/update-page.input';
import { ActiveUserGuard } from '../shared/guards/active-user.guard';
@UseGuards(ActiveUserGuard)
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
  @ApiConsumes('multipart/form-data')
  @ApiBody(CreatePageSwagger)
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(FileInterceptor('logo'))
  @Post('create')
  async createPage(
    @Body() input: CreatePageInput,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return await this.pageService.createPage(input, logo);
  }

  @ApiBearerAuth()
  @ApiTags('page')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody(UpdatePageSwagger)
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(FileInterceptor('logo'))
  @Put('update')
  async updatePage(
    @Body() input: UpdatePageInput,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return await this.pageService.updatePage(input, logo);
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
  @Get('search')
  async searchPages(@Query() input: SearchPageInput) {
    return await this.pageService.searchPages(input);
  }

  @ApiBearerAuth()
  @ApiTags('page')
  @UseGuards(AuthGuard)
  @Get('pages')
  async getPages(@Query() pagination: Pagination) {
    return await this.pageService.getPages(pagination);
  }

  @ApiBearerAuth()
  @ApiTags('page')
  @UseGuards(AuthGuard)
  @Delete('remove')
  async deletePage(@Body() input: DeletePageInput) {
    return await this.pageService.deletePage(input);
  }
}
