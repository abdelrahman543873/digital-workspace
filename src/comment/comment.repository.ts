import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CommentDocument, Comment } from './schema/comment.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { PostCommentInput } from './inputs/post-comment.input';

@Injectable()
export class CommentRepository extends BaseRepository<Comment> {
  constructor(
    @InjectModel(Comment.name) private commentSchema: Model<CommentDocument>,
  ) {
    super(commentSchema);
  }

  async postComment(commenter: ObjectId, input: PostCommentInput) {
    return await this.commentSchema.create({
      commenter,
      post: input.postId,
      content: input.content,
    });
  }
}
