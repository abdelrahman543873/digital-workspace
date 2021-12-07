import { LookupSchemasEnum } from './../app.const';
import { Injectable } from '@nestjs/common';
import { Page, PageDocument } from './schema/page.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { ManageLikePageInput } from './inputs/manage-like-page.input';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId, Types } from 'mongoose';
import { CreatePageInput } from './inputs/create-page.input';
import { Pagination } from '../shared/utils/pagination.input';
import { LikedPagesInput } from './inputs/liked-pages.input';
import { DeletePageInput } from './inputs/delete-page.input';
import { SearchPageInput } from './inputs/search-page.input';
import { UpdatePageInput } from './inputs/update-page.input';

@Injectable()
export class PageRepository extends BaseRepository<Page> {
  constructor(
    @InjectModel(Page.name)
    private pageSchema: AggregatePaginateModel<PageDocument>,
  ) {
    super(pageSchema);
  }
  async manageLikePage(userId: ObjectId, input: ManageLikePageInput) {
    await this.pageSchema.updateOne({ _id: new Types.ObjectId(input.pageId) }, [
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
    return await this.pageSchema.findOne({
      _id: new Types.ObjectId(input.pageId),
    });
  }

  async createPage(
    userId: ObjectId,
    input: CreatePageInput,
    logo: Express.Multer.File,
  ) {
    return await this.pageSchema.create({
      admin: userId,
      ...input,
      ...(logo && { logo: `${process.env.HOST}pages/${logo.filename}` }),
    });
  }

  async updatePage(
    userId: ObjectId,
    input: UpdatePageInput,
    logo: Express.Multer.File,
  ) {
    return await this.pageSchema.findOneAndUpdate(
      { _id: new Types.ObjectId(input.pageId), admin: userId },
      {
        name: input.name,
        ...(logo && { logo: `${process.env.HOST}pages/${logo.filename}` }),
      },
      { new: true },
    );
  }

  async getLikedPages(userId: ObjectId, input: LikedPagesInput) {
    const chosenId = input.userId ? new Types.ObjectId(input.userId) : userId;
    const aggregation = this.pageSchema.aggregate([
      {
        $match: {
          $expr: {
            $in: [chosenId, '$likes'],
          },
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
    ]);
    return await this.pageSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  async getPages(pagination: Pagination) {
    const aggregation = this.pageSchema.aggregate([
      {
        $match: {},
      },
    ]);
    return await this.pageSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }

  async deletePage(userId: ObjectId, input: DeletePageInput) {
    return await this.pageSchema.findOneAndDelete({
      _id: new Types.ObjectId(input.pageId),
      admin: userId,
    });
  }

  async searchPage(input: SearchPageInput) {
    const aggregation = this.pageSchema.aggregate([
      {
        $match: {
          name: { $regex: input.keyword, $options: 'i' },
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
    return await this.pageSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }
}
