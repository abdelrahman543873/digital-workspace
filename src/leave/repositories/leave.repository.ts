import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../shared/generics/repository.abstract';
import { Leave, LeaveDocument } from '../schema/leave.schema';
import {
  AggregatePaginateModel,
  ObjectId,
  QueryWithHelpers,
  UpdateWriteOpResult,
} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLeaveInput } from '../inputs/create-leave.input';
import { UpdateLeaveInput } from '../inputs/update-leave.input';
import { Pagination } from '../../shared/utils/pagination.input';
import { ManageLeaveInput } from '../inputs/manage-leave.input';
import { CancelLeaveInput } from '../inputs/cancel-leave.input';
import { LEAVE_STATUS } from '../leave.enum';
import { LookupSchemasEnum } from '../../app.const';
import { GetLeavesListInput } from '../inputs/get-leaves-list.input';
import { GetLeavesAssignedListInput } from '../inputs/get-leaves-assigned-list.input';

@Injectable()
export class LeaveRepository extends BaseRepository<Leave> {
  constructor(
    @InjectModel(Leave.name)
    private leaveSchema: AggregatePaginateModel<LeaveDocument>,
  ) {
    super(leaveSchema);
  }

  createLeave(
    employee: ObjectId,
    input: CreateLeaveInput,
    attachments: Array<Express.Multer.File>,
  ) {
    return this.leaveSchema.create({
      ...input,
      employee,
      ...(attachments && {
        attachments: attachments.map((attachment) => {
          return `${process.env.HOST}${attachment.filename}`;
        }),
      }),
    });
  }

  updateLeave(
    input: UpdateLeaveInput,
    attachments: Array<Express.Multer.File>,
  ) {
    return this.leaveSchema.findOneAndUpdate(
      { _id: input.id },
      {
        ...input,
        ...(attachments && {
          attachments: attachments.map((attachment) => {
            return `${process.env.HOST}${attachment.filename}`;
          }),
        }),
      },
      { new: true },
    );
  }

  getLeavesList(input: GetLeavesListInput, employee: ObjectId) {
    const aggregation = this.leaveSchema.aggregate([
      {
        $match: {
          employee,
          ...(input.status && { status: input.status }),
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.leaveTypes,
          localField: 'type',
          foreignField: '_id',
          as: 'type',
        },
      },
      { $unwind: '$type' },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          localField: 'replacement',
          foreignField: '_id',
          as: 'replacement',
        },
      },
      {
        $unwind: {
          path: '$replacement',
          preserveNullAndEmptyArrays: true,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.leaveSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  getAssignedLeavesList(
    input: GetLeavesAssignedListInput,
    employees: ObjectId[],
  ) {
    const aggregation = this.leaveSchema.aggregate([
      {
        $match: {
          ...(input.status && { status: input.status }),
          $expr: {
            $in: ['$employee', employees],
          },
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.leaveTypes,
          localField: 'type',
          foreignField: '_id',
          as: 'type',
        },
      },
      { $unwind: '$type' },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          localField: 'employee',
          foreignField: '_id',
          as: 'employee',
        },
      },
      { $unwind: '$employee' },
      {
        $lookup: {
          from: LookupSchemasEnum.departments,
          localField: 'employee.department',
          foreignField: '_id',
          as: 'employee.department',
        },
      },
      {
        $unwind: {
          path: '$employee.department',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          localField: 'replacement',
          foreignField: '_id',
          as: 'replacement',
        },
      },
      {
        $unwind: {
          path: '$replacement',
          preserveNullAndEmptyArrays: true,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.leaveSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  getHrLeavesList(input: GetLeavesAssignedListInput) {
    const aggregation = this.leaveSchema.aggregate([
      {
        $match: {
          ...(input.status && { status: input.status }),
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.leaveTypes,
          localField: 'type',
          foreignField: '_id',
          as: 'type',
        },
      },
      { $unwind: '$type' },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          localField: 'employee',
          foreignField: '_id',
          as: 'employee',
        },
      },
      { $unwind: '$employee' },
      {
        $lookup: {
          from: LookupSchemasEnum.departments,
          localField: 'employee.department',
          foreignField: '_id',
          as: 'employee.department',
        },
      },
      {
        $unwind: {
          path: '$employee.department',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          localField: 'replacement',
          foreignField: '_id',
          as: 'replacement',
        },
      },
      {
        $unwind: {
          path: '$replacement',
          preserveNullAndEmptyArrays: true,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return this.leaveSchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }

  manageLeave(input: ManageLeaveInput) {
    return this.leaveSchema.findOneAndUpdate(
      { _id: input.id },
      {
        status: input.status,
      },
      { new: true },
    );
  }

  cancelLeave(input: CancelLeaveInput): QueryWithHelpers<any, Leave> {
    return this.leaveSchema.findOneAndUpdate(
      { _id: input.id },
      { status: LEAVE_STATUS.CANCELLED },
      { new: true },
    );
  }
}
