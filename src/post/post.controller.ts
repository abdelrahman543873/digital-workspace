import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostInput } from './inputs/add-post.input';
import { ApiTags } from '@nestjs/swagger';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiTags('post')
  @Post()
  async addPost(@Body() input: AddPostInput) {
    return this.postService.addPost(input);
  }
}
