import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostInput } from './inputs/add-post.input';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../shared/guards/auth.guard';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiTags('post')
  @UseGuards(AuthGuard)
  @Post()
  async addPost(@Body() input: AddPostInput) {
    return await this.postService.addPost(input);
  }
}
