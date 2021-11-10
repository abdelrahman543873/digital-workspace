import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel, ObjectId } from 'mongoose';
import { Group, GroupDocument } from './schema/group.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { CreateGroupInput } from './inputs/create-group.input';

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
}
