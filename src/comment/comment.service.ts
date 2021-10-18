import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { CommentRepository } from './comment.repository';
import { PostCommentInput } from './inputs/post-comment.input';

@Injectable()
export class CommentService {
  constructor(
    private commentRepo: CommentRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}
  async postComment(input: PostCommentInput) {
    return await this.commentRepo.postComment(
      this.request.currentUser._id,
      input,
    );
  }
}
