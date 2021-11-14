import { Injectable } from '@nestjs/common';
import { Page, PageDocument } from './schema/page.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { ManageLikePageInput } from './inputs/manage-like-page.input';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId, Types } from 'mongoose';
import { CreatePageInput } from './inputs/create-page.input';
import { Pagination } from '../shared/utils/pagination.input';

@Injectable()
export class PageRepository extends BaseRepository<Page> {
  constructor(
    @InjectModel(Page.name)
    private pageSchema: AggregatePaginateModel<PageDocument>,
  ) {
    super(pageSchema);
  }
  async manageLikePage(userId: ObjectId, input: ManageLikePageInput) {
    await this.pageSchema.updateOne({ _id: input.pageId }, [
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
    return await this.pageSchema.findOne({ _id: input.pageId });
  }

  async createPage(userId: ObjectId, input: CreatePageInput) {
    return await this.pageSchema.create({ admin: userId, ...input });
  }

  async getLikedPages(userId: ObjectId, pagination: Pagination) {
    const aggregation = this.pageSchema.aggregate([
      {
        $match: {
          $expr: { $in: [userId, '$likes'] },
        },
      },
    ]);
    return await this.pageSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
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
}
