import { RequestContext } from './../shared/request.interface';
import { Inject, Injectable } from '@nestjs/common';
import { LeaveRepository } from './repositories/leave.repository';
import { CreateLeaveInput } from './inputs/create-leave.input';
import { REQUEST } from '@nestjs/core';
import { LeaveTypeRepository } from './repositories/leave-type.repository';
import { CreateLeaveTypeInput } from './inputs/create-leave-type.input';
import { Pagination } from '../shared/utils/pagination.input';
import { DeleteLeaveTypeInput } from './inputs/delete-levae-type.input';
import { UpdateLeaveTypeInput } from './inputs/update-leave-type.input';
import { UpdateLeaveInput } from './inputs/update-leave.input';
import { ManageLeaveInput } from './inputs/manage-leave.input';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/schema/user.schema';
import { ObjectId } from 'mongoose';
import { LEAVE_STATUS } from './leave.enum';
import { CancelLeaveInput } from './inputs/cancel-leave.input';
import { GetLeavesListInput } from './inputs/get-leaves-list.input';
import { GetLeavesAssignedListInput } from './inputs/get-leaves-assigned-list.input';
import { RejectionReasonRepository } from './repositories/rejection-reason.repository';
import { AddRejectionReasonInput } from './inputs/add-rejection-reason.input';
import { LeaveCriteriaRepository } from './repositories/leave-criteria.repository';
import { CreateLeaveCriteriaInput } from './inputs/create-leave-criteria.input';
import { DeleteLeaveCriteriaInput } from './inputs/delete-leave-criteria.input';
import { UpdateLeaveCriteriaInput } from './inputs/update-leave-criteria.input';
import { LeaveUserRepository } from './repositories/leave-user.repository';

@Injectable()
export class LeaveService {
  constructor(
    private readonly leaveRepository: LeaveRepository,
    @Inject(REQUEST) private readonly request: RequestContext,
    private readonly leaveTypeRepository: LeaveTypeRepository,
    private readonly userRepository: UserRepository,
    private readonly rejectionReasonRepository: RejectionReasonRepository,
    private readonly leaveCriteriaRepository: LeaveCriteriaRepository,
    private readonly leaveUserRepository: LeaveUserRepository,
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

  async manageLeave(input: ManageLeaveInput) {
    const leave = await this.leaveRepository.findOne({ _id: input.id });
    if (input.status === LEAVE_STATUS.APPROVED) {
      await this.leaveUserRepository.addUserLeave({
        user: leave.employee,
        leaveType: leave.type,
        // getting the number of days requested for the vacation
        numberOfDays: Math.ceil(
          (leave.endDate.getTime() - leave.startDate.getTime()) /
            (1000 * 3600 * 24),
        ),
      });
    }
    return await this.leaveRepository.manageLeave(input);
  }

  getLeavesList(input: GetLeavesListInput) {
    return this.leaveRepository.getLeavesList(
      input,
      this.request.currentUser._id,
    );
  }

  getHrLeavesList(input: GetLeavesListInput) {
    return this.leaveRepository.getHrLeavesList(input);
  }

  async getAssignedLeavesList(input: GetLeavesAssignedListInput) {
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

  async cancelLeave(input: CancelLeaveInput) {
    const leave = await this.leaveRepository.findOne({ _id: input.id });
    const updatedLeave = await this.leaveRepository.cancelLeave(input);
    if (leave.status === LEAVE_STATUS.APPROVED)
      await this.leaveUserRepository.removeLatestUserLeave({
        user: leave.employee,
        leaveType: leave.type,
      });
    return updatedLeave;
  }

  addRejectionReason(input: AddRejectionReasonInput) {
    return this.rejectionReasonRepository.addRejectionReason(input);
  }

  getRejectionReasonsList(input: Pagination) {
    return this.rejectionReasonRepository.getRejectionReasonsList(input);
  }

  createLeaveCriteria(input: CreateLeaveCriteriaInput) {
    return this.leaveCriteriaRepository.createLeaveCriteria(input);
  }

  getLeaveCriteriaList(input: Pagination) {
    return this.leaveCriteriaRepository.getLeaveCriteriaList(input);
  }

  updateLeaveCriteria(input: UpdateLeaveCriteriaInput) {
    return this.leaveCriteriaRepository.updateLeaveCriteria(input);
  }

  deleteLeaveCriteria(input: DeleteLeaveCriteriaInput) {
    return this.leaveCriteriaRepository.deleteOne({ input });
  }

  getLeaveBalance() {
    return this.leaveCriteriaRepository.getLeaveBalance(
      this.request.currentUser,
    );
  }
}
