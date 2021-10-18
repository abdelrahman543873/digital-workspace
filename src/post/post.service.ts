import { RequestContext } from './../shared/request.interface';
import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { AddPostInput } from './inputs/add-post.input';
import { REQUEST } from '@nestjs/core';
import { LikePostInput } from './inputs/like-post.input';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}

  async addPost(input: AddPostInput) {
    return await this.postRepository.addPost(
      this.request.currentUser._id,
      input,
    );
  }

  async likePost(input: LikePostInput) {
    return await this.postRepository.likePost(
      this.request.currentUser._id,
      input,
    );
  }
}
