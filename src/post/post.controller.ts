import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostInput } from './inputs/add-post.input';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async addPost(@Body() input: AddPostInput) {
    return this.postService.addPost(input);
  }
}
