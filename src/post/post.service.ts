import { Pagination } from './../shared/utils/pagination.input';
import { Inject, Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { AddPostInput } from './inputs/add-post.input';
import { REQUEST } from '@nestjs/core';
import { LikePostInput } from './inputs/like-post.input';
import { RemovePostInput } from './inputs/remove-post.input';
import { ReportPostInput } from './inputs/report-post.input';
import { RequestContext } from 'src/shared/request.interface';
import { MyPostsInput } from './inputs/my-posts.input';

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

  async reportPost(input: ReportPostInput) {
    return await this.postRepository.reportPost(
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

  async getNewsFeed(pagination: Pagination) {
    const posts = await this.postRepository.getNewsFeed(
      this.request.currentUser,
      pagination,
    );
    return posts;
  }

  async getMyPosts(input: MyPostsInput) {
    return await this.postRepository.getMyPosts(
      this.request.currentUser._id,
      input,
    );
  }
}
