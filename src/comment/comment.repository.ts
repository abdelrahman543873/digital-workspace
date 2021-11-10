import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { CommentDocument, Comment } from './schema/comment.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { PostCommentInput } from './inputs/post-comment.input';
import { ManageLikeCommentInput } from './inputs/manage-like-comment.input';
import { DeleteCommentInput } from './inputs/delete-comment.input';

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
      post: new Types.ObjectId(input.postId),
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

  async deleteCommentInput(userId: ObjectId, input: DeleteCommentInput) {
    return await this.commentSchema.deleteOne({
      $or: [
        {
          _id: input.commentId,
          commenter: userId,
        },
        {
          _id: input.commentId,
          'post.userId': userId,
        },
      ],
    });
  }
}
