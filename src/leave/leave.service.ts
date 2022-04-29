import { RequestContext } from './../shared/request.interface';
import { Inject, Injectable } from '@nestjs/common';
import { LeaveRepository } from './leave.repository';
import { CreateLeaveInput } from './inputs/create-leave.input';
import { REQUEST } from '@nestjs/core';
import { LeaveTypeRepository } from './leave-type.repository';
import { CreateLeaveTypeInput } from './inputs/create-leave-type.input';
import { Pagination } from '../shared/utils/pagination.input';
import { DeleteLeaveTypeInput } from './inputs/delete-levae-type.input';
import { UpdateLeaveTypeInput } from './inputs/update-leave-type.input';
import { UpdateLeaveInput } from './inputs/update-leave.input';
import { ManageLeaveInput } from './inputs/manage-leave.input';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/schema/user.schema';
import { ObjectId } from 'mongoose';

@Injectable()
export class LeaveService {
  constructor(
    private readonly leaveRepository: LeaveRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
    private readonly leaveTypeRepository: LeaveTypeRepository,
    private readonly userRepository: UserRepository,
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
  updateLeave(
    input: UpdateLeaveInput,
    attachments: Array<Express.Multer.File>,
  ) {
    return this.leaveRepository.updateLeave(input, attachments);
  }

  manageLeave(input: ManageLeaveInput) {
    return this.leaveRepository.manageLeave(input);
  }

  getLeavesList(input: Pagination) {
    return this.leaveRepository.getLeavesList(
      input,
      this.request.currentUser._id,
    );
  }

  async getAssignedLeavesList(input: Pagination) {
    const managedEmployees: User[] =
      await this.userRepository.getUserSubordinates(
        this.request.currentUser._id,
      );
    const managedEmployeesIds: ObjectId[] = managedEmployees.map(
      (managedEmployee) => {
        return managedEmployee._id;
      },
    );
    return await this.leaveRepository.getAssignedLeavesList(
      input,
      managedEmployeesIds,
    );
  }

  createLeaveType(input: CreateLeaveTypeInput) {
    return this.leaveTypeRepository.createLeaveType(input);
  }

  updateLeaveType(input: UpdateLeaveTypeInput) {
    return this.leaveTypeRepository.updateLeaveType(input);
  }

  deleteLeaveType(input: DeleteLeaveTypeInput) {
    return this.leaveTypeRepository.deleteLeaveType(input);
  }

  getLeaveTypes(input: Pagination) {
    return this.leaveTypeRepository.getLeaveTypes(input);
  }
}
