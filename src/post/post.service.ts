import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { AddPostInput } from './inputs/add-post.input';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  async addPost(input: AddPostInput) {
    return await this.postRepository.addPost(input);
  }
}
