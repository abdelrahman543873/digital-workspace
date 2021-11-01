import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CommentDocument, Comment } from './schema/comment.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { PostCommentInput } from './inputs/post-comment.input';
import { ManageLikeCommentInput } from './inputs/manage-like-comment.input';

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

  async manageLikeComment(userId: ObjectId, input: ManageLikeCommentInput) {
    await this.commentSchema.updateOne({ _id: input.commentId }, [
      {
        $set: {
          likes: {
            $cond: [
              {
                $in: [userId, '$likes'],
              },
              {
                $setDifference: ['$likes', [userId]],
              },
              {
                $concatArrays: ['$likes', [userId]],
              },
            ],
          },
        },
      },
    ]);
    return await this.commentSchema.findOne({ _id: input.commentId });
  }
}
