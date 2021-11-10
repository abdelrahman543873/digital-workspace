import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { GroupRepository } from './group.repository';
import { CreateGroupInput } from './inputs/create-group.input';
import { ManageJoinGroupInput } from './inputs/manage-join-group.input';
import { Pagination } from '../shared/utils/pagination.input';

@Injectable()
export class GroupService {
  constructor(
    private groupRepository: GroupRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
  ) {}
  async createGroup(input: CreateGroupInput) {
    return await this.groupRepository.createGroup(
      this.request.currentUser._id,
      input,
    );
  }

  async manageJoinGroup(input: ManageJoinGroupInput) {
    return await this.groupRepository.manageJoinGroup(
      this.request.currentUser._id,
      input,
    );
  }

  async getJoinedGroups(pagination: Pagination) {
    return await this.groupRepository.getJoinedGroups(
      this.request.currentUser._id,
      pagination,
    );
  }
}
