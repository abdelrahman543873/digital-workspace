import { Pagination } from './../shared/utils/pagination.input';
import { LookupSchemasEnum } from './../app.const';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, AggregatePaginateModel } from 'mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { AddPostInput } from './inputs/add-post.input';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { LikePostInput } from './inputs/like-post.input';
import { RemovePostInput } from './inputs/remove-post.input';
import { ReportPostInput } from './inputs/report-post.input';
@Injectable()
export class PostRepository extends BaseRepository<Post> {
  constructor(
    @InjectModel(Post.name)
    private postSchema: AggregatePaginateModel<PostDocument>,
  ) {
    super(postSchema);
  }

  async addPost(
    userId: ObjectId,
    attachments: Array<Express.Multer.File>,
    input: AddPostInput,
  ) {
    return await this.postSchema.create({
      ...input,
      userId,
      // refactor
      attachments: attachments.map((attachment) => {
        return `${process.env.HOST}posts/${attachment.filename}`;
      }),
    });
  }

  async manageLike(userId: ObjectId, input: LikePostInput) {
    await this.postSchema.updateOne({ _id: input.postId }, [
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
    return await this.postSchema.findOne({ _id: input.postId });
  }

  async removePost(userId: ObjectId, input: RemovePostInput) {
    return await this.postSchema.deleteOne({ userId, id: input.postId });
  }

  async reportPost(userId: ObjectId, input: ReportPostInput) {
    return await this.postSchema.findOneAndUpdate(
      { _id: input.postId },
      { $push: { reports: { userId, reason: input.reason } } },
      { new: true },
    );
  }

  async getNewsFeed(userId: ObjectId, pagination: Pagination) {
    const aggregation = this.postSchema.aggregate([
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          as: 'user',
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$_id', userId],
                },
              },
            },
          ],
        },
      },
      {
        $unwind: '$user',
      },
      {
        $match: {
          $expr: { $in: ['$userId', '$user.following'] },
        },
      },
      {
        $project: { user: 0 },
      },
    ]);
    return await this.postSchema.aggregatePaginate(aggregation, {
      sort: { createdAt: 1 },
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}
