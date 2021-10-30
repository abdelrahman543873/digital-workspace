import { RequestContext } from './../shared/request.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { AddPostInput } from './inputs/add-post.input';
import { REQUEST } from '@nestjs/core';
import { LikePostInput } from './inputs/like-post.input';
import { RemovePostInput } from './inputs/remove-post.input';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async addPost(input: AddPostInput, attachments: Array<Express.Multer.File>) {
    return await this.postRepository.addPost(
      this.request.currentUser._id,
      attachments,
      input,
    );
  }

  async manageLike(input: LikePostInput) {
    return await this.postRepository.manageLike(
      this.request.currentUser._id,
      input,
    );
  }
  async removePost(input: RemovePostInput) {
    return await this.postRepository.removePost(
      this.request.currentUser._id,
      input,
    );
  }
}
