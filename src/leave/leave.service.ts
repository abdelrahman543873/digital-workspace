import { RequestContext } from './../shared/request.interface';
import { Inject, Injectable } from '@nestjs/common';
import { LeaveRepository } from './leave.repository';
import { CreateLeaveInput } from './inputs/create-leave.input';
import { REQUEST } from '@nestjs/core';
import { LeaveTypeRepository } from './leave-type.repository';
import { CreateLeaveTypeInput } from './inputs/create-leave-type.input';
import { Pagination } from '../shared/utils/pagination.input';
import { DeleteLeaveTypeInput } from './inputs/delete-levae-type.input';

@Injectable()
export class LeaveService {
  constructor(
    private readonly leaveRepository: LeaveRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
    private readonly leaveTypeRepository: LeaveTypeRepository,
  ) {}

  createLeave(
    input: CreateLeaveInput,
    attachments: Array<Express.Multer.File>,
  ) {
    return this.leaveRepository.createLeave(
      this.request.currentUser._id,
      input,
      attachments,
    );
  }

  createLeaveType(input: CreateLeaveTypeInput) {
    return this.leaveTypeRepository.createLeaveType(input);
  }

  deleteLeaveType(input: DeleteLeaveTypeInput) {
    return this.leaveTypeRepository.deleteLeaveType(input);
  }

  getLeaveTypes(input: Pagination) {
    return this.leaveTypeRepository.getLeaveTypes(input);
  }
}
