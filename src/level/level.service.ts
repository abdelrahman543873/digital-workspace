import { Inject, Injectable } from '@nestjs/common';
import { CreateLevelInput } from './inputs/create-level.input';
import { LevelRepository } from './level.repository';
import { DeleteLevelInput } from './inputs/delete-level.input';
import { BaseHttpException } from '../shared/exceptions/base-http-exception';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from '../../dist/src/shared/request.interface';
import { UserRepository } from '../user/user.repository';
import { UpdateLevelInput } from './inputs/update-level.input';
import { Types } from 'mongoose';

@Injectable()
export class LevelService {
  constructor(
    private readonly levelRepository: LevelRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
    private readonly userRepository: UserRepository,
  ) {}

  async createLevel(input: CreateLevelInput) {
    return await this.levelRepository.createLevel(input);
  }

  async deleteLevel(input: DeleteLevelInput) {
    const level = await this.levelRepository.getLevelByName(input.name);
    if (!level) throw new BaseHttpException(this.request.lang, 614);
    const usersCount = await this.userRepository.getLevelUsers(level._id);
    if (usersCount) throw new BaseHttpException(this.request.lang, 615);
    return await this.levelRepository.deleteLevel(input);
  }

  async updateLevel(input: UpdateLevelInput) {
    return await this.levelRepository.updateLevel(input.id, input);
  }
}
