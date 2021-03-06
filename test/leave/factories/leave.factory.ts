import { leaveTestRepo } from '../test-repos/leave-test-repo';
import { date, random } from 'faker';
import { ObjectId } from 'mongoose';
import { userFactory } from '../../../src/user/user.factory';
import { Leave } from '../../../src/leave/schema/leave.schema';
import { leaveTypeFactory } from './leave-type.factory';
import { LEAVE_STATUS } from '../../../src/leave/leave.enum';
import { rejectionReasonFactory } from './rejection-reason.factory';

interface LeaveType {
  employee?: ObjectId;
  startDate?: Date;
  endDate?: Date;
  type?: ObjectId;
  comment?: string;
  attachments?: string[];
  replacement?: ObjectId;
  status?: string;
  rejectionJustification?: string;
  rejectionReason?: ObjectId;
}

export const buildLeaveParams = async (
  obj: LeaveType = {},
): Promise<LeaveType> => {
  const user = await userFactory();
  return {
    employee: obj.employee || user._id,
    startDate: obj.startDate || date.past(),
    endDate: obj.endDate || date.future(),
    type: obj.type || (await leaveTypeFactory())._id,
    comment: obj.comment || random.words(),
    attachments: obj.attachments || [`${process.env.HOST}/defaults/avatar.jpg`],
    replacement: obj.replacement || user._id,
    status: obj.status || LEAVE_STATUS.PENDING,
    rejectionJustification: obj.rejectionJustification || random.words(5),
    rejectionReason:
      obj.rejectionReason || (await rejectionReasonFactory())._id,
  };
};

export const leavesFactory = async (
  count = 10,
  obj: LeaveType = {},
): Promise<Leave[]> => {
  const leaves: LeaveType[] = [];
  for (let i = 0; i < count; i++) {
    leaves.push(await buildLeaveParams(obj));
  }
  return await leaveTestRepo().addMany(leaves);
};

export const leaveFactory = async (obj: LeaveType = {}): Promise<Leave> => {
  const params: LeaveType = await buildLeaveParams(obj);
  return await leaveTestRepo().add(params);
};
