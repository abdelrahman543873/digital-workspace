import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from 'src/shared/request.interface';
import { GroupRepository } from './group.repository';
import { CreateGroupInput } from './inputs/create-group.input';

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
}
