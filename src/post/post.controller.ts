import { PostService } from './post.service';
import { AddPostInput } from './inputs/add-post.input';
import { AuthGuard } from '../shared/guards/auth.guard';
import { LikePostInput } from './inputs/like-post.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Put, UseGuards, Param } from '@nestjs/common';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiBearerAuth()
  @ApiTags('post')
  @UseGuards(AuthGuard)
  @Post()
  async addPost(@Body() input: AddPostInput) {
    return await this.postService.addPost(input);
  }

  @ApiBearerAuth()
  @ApiTags('post')
  @UseGuards(AuthGuard)
  @Put('like/:postId')
  async likePost(@Param() input: LikePostInput) {
    return await this.postService.likePost(input);
  }
}
