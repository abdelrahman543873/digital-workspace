import { Pagination } from './../shared/utils/pagination.input';
import { LookupSchemasEnum } from './../app.const';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ObjectId,
  AggregatePaginateModel,
  Types,
  QueryWithHelpers,
} from 'mongoose';
import { Post, PostDocument } from './schema/post.schema';
import { AddPostInput } from './inputs/add-post.input';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { LikePostInput } from './inputs/like-post.input';
import { RemovePostInput } from './inputs/remove-post.input';
import { ReportPostInput } from './inputs/report-post.input';
import { User } from '../user/schema/user.schema';
import { MyPostsInput } from './inputs/my-posts.input';
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
      ...(attachments && {
        attachments: attachments.map((attachment) => {
          return `${process.env.HOST}${attachment.filename}`;
        }),
      }),
    });
  }

  async manageLike(userId: ObjectId, input: LikePostInput) {
    await this.postSchema.updateOne({ _id: new Types.ObjectId(input.postId) }, [
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
    return await this.postSchema.findOne({
      _id: new Types.ObjectId(input.postId),
    });
  }

  async removePost(
    userId: ObjectId,
    input: RemovePostInput,
  ): Promise<QueryWithHelpers<any, any>> {
    return await this.postSchema.deleteOne({
      $and: [{ userId }, { _id: new Types.ObjectId(input.postId) }],
    });
  }

  async reportPost(userId: ObjectId, input: ReportPostInput) {
    await this.postSchema.updateOne({ _id: new Types.ObjectId(input.postId) }, [
      {
        $set: {
          reports: {
            $concatArrays: ['$reports', [{ userId, reason: input.reason }]],
          },
        },
      },
      {
        $set: {
          isPublished: {
            $cond: {
              if: { $gte: [{ $size: '$reports' }, 2] },
              then: false,
              else: '$isPublished',
            },
          },
        },
      },
    ]);
    return await this.postSchema.findOne({
      _id: new Types.ObjectId(input.postId),
    });
  }

  async getNewsFeed(user: User, pagination: Pagination) {
    const aggregation = this.postSchema.aggregate([
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          as: 'company',
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$isCompany', true] },
              },
            },
            {
              $project: { _id: 1 },
            },
          ],
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                { $expr: { $in: ['$userId', '$company._id'] } },
                { $expr: { $in: ['$userId', user.following] } },
                { userId: user._id },
              ],
            },
            { $expr: { $not: { $in: ['$_id', user.hiddenPosts] } } },
            { $expr: { $eq: ['$isPublished', true] } },
          ],
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          let: { likes: '$likes' },
          as: 'likes',
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$likes'],
                },
              },
            },
            { $project: { profilePic: 1, fullName: 1 } },
          ],
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.comments,
          let: { postId: '$_id' },
          as: 'comments',
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$postId', '$post'],
                },
              },
            },
            {
              $lookup: {
                from: LookupSchemasEnum.users,
                localField: 'commenter',
                foreignField: '_id',
                as: 'commenter',
              },
            },
            { $unwind: '$commenter' },
            { $sort: { createdAt: -1 } },
          ],
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      { $sort: { createdAt: -1 } },
    ]);
    const aggregationResult = await this.postSchema.aggregatePaginate(
      aggregation,
      {
        offset: pagination.offset * pagination.limit,
        limit: pagination.limit,
      },
    );
    const postsIds = aggregationResult.docs.map((post) => {
      return post._id;
    });
    await this.postSchema.updateMany(
      { _id: { $in: postsIds } },
      {
        $addToSet: {
          seen: user._id,
        },
      },
    );
    return aggregationResult;
  }

  async getMyPosts(userId: ObjectId, input: MyPostsInput) {
    const chosenId = input.userId ? new Types.ObjectId(input.userId) : userId;
    const aggregation = this.postSchema.aggregate([
      {
        $match: { $and: [{ userId: chosenId }, { isPublished: true }] },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: LookupSchemasEnum.comments,
          let: { postId: '$_id' },
          as: 'comments',
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$postId', '$post'],
                },
              },
            },
            {
              $lookup: {
                from: LookupSchemasEnum.users,
                localField: 'commenter',
                foreignField: '_id',
                as: 'commenter',
              },
            },
            { $unwind: '$commenter' },
          ],
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          let: { likes: '$likes' },
          as: 'likes',
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$likes'],
                },
              },
            },
            { $project: { profilePic: 1, fullName: 1 } },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return await this.postSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }
}
