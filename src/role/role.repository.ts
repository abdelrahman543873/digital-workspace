import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel } from 'mongoose';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { Role, RoleDocument } from './schema/role.schema';
import { AddRoleInput } from './inputs/add-role.input';
import { Pagination } from '../shared/utils/pagination.input';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  constructor(
    @InjectModel(Role.name)
    private roleSchema: AggregatePaginateModel<RoleDocument>,
  ) {
    super(roleSchema);
  }

  addRole(input: AddRoleInput) {
    return this.roleSchema.create(input);
  }

  getRolesList(input: Pagination) {
    const aggregation = this.roleSchema.aggregate([
      {
        $match: {},
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.roleSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }
}
