import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId, Types } from 'mongoose';
import { Group, GroupDocument } from './schema/group.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { CreateGroupInput } from './inputs/create-group.input';
import { ManageJoinGroupInput } from './inputs/manage-join-group.input';
import { Pagination } from '../shared/utils/pagination.input';

@Injectable()
export class GroupRepository extends BaseRepository<Group> {
  constructor(
    @InjectModel(Group.name)
    private groupSchema: AggregatePaginateModel<GroupDocument>,
  ) {
    super(groupSchema);
  }
  async createGroup(userId: ObjectId, input: CreateGroupInput) {
    return await this.groupSchema.create({ admin: userId, ...input });
  }

  async manageJoinGroup(userId: ObjectId, input: ManageJoinGroupInput) {
    await this.groupSchema.updateOne(
      { _id: new Types.ObjectId(input.groupId) },
      [
        {
          $set: {
            members: {
              $cond: [
                {
                  $in: [userId, '$members'],
                },
                {
                  $setDifference: ['$members', [userId]],
                },
                {
                  $concatArrays: ['$members', [userId]],
                },
              ],
            },
          },
        },
      ],
    );
    return await this.groupSchema.findOne({
      _id: new Types.ObjectId(input.groupId),
    });
  }

  async getJoinedGroups(userId: ObjectId, pagination: Pagination) {
    const aggregation = this.groupSchema.aggregate([
      {
        $match: {
          $expr: { $in: [userId, '$members'] },
        },
      },
    ]);
    return await this.groupSchema.aggregatePaginate(aggregation, {
      offset: pagination.offset * pagination.limit,
      limit: pagination.limit,
    });
  }
}
