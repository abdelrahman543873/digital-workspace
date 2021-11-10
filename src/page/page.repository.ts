import { Injectable, Post } from '@nestjs/common';
import { Page, PageDocument } from './schema/page.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { ManageLikePageInput } from './inputs/manage-like-page.input';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId } from 'mongoose';

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
}
