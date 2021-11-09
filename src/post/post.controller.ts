import { Pagination } from './../shared/utils/pagination.input';
import { PostService } from './post.service';
import { AddPostInput } from './inputs/add-post.input';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LikePostInput } from './inputs/like-post.input';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  Param,
  UseInterceptors,
  UploadedFiles,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AddPostSwagger } from './swagger/add-post.swagger';
import { RemovePostInput } from './inputs/remove-post.input';
import { ReportPostInput } from './inputs/report-post.input';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiBearerAuth()
  @ApiTags('post')
  @ApiConsumes('multipart/form-data')
  @ApiBody(AddPostSwagger)
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('attachments'))
  @Post()
  async addPost(
    @Body() input: AddPostInput,
    @UploadedFiles() attachments: Array<Express.Multer.File>,
  ) {
    return await this.postService.addPost(input, attachments);
  }

  @ApiBearerAuth()
  @ApiTags('post')
  @UseGuards(AuthGuard)
  @Put('manageLike/:postId')
  async manageLike(@Param() input: LikePostInput) {
    return await this.postService.manageLike(input);
  }

  @ApiBearerAuth()
  @ApiTags('post')
  @UseGuards(AuthGuard)
  @Put('report')
  async reportPost(@Body() input: ReportPostInput) {
    return await this.postService.reportPost(input);
  }

  @ApiBearerAuth()
  @ApiTags('post')
  @UseGuards(AuthGuard)
  @Delete('remove/:postId')
  async removePost(@Param() input: RemovePostInput) {
    return await this.postService.removePost(input);
  }

  @ApiBearerAuth()
  @ApiTags('post')
  @UseGuards(AuthGuard)
  @Get('newsFeed')
  async getNewsFeed(@Query() pagination: Pagination) {
    return await this.postService.getNewsFeed(pagination);
  }

  @ApiBearerAuth()
  @ApiTags('post')
  @UseGuards(AuthGuard)
  @Get('myPosts')
  async getMyPosts(@Query() pagination: Pagination) {
    return await this.postService.getNewsFeed(pagination);
  }
}
