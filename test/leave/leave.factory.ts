import { leaveTestRepo } from './leave-test-repo';
import { name, datatype, date, random } from 'faker';
import { ObjectId } from 'mongoose';
import { skillTestRepo } from '../../test/skill/skill-test-repo';
import { userFactory } from '../../src/user/user.factory';
import { leaveReasonFactory } from './leave-reason.factory';
import { Leave } from '../../src/leave/schema/leave.schema';

interface LeaveType {
  employee?: ObjectId;
  startDate?: Date;
  endDate?: Date;
  reason?: ObjectId;
  comment?: string;
  attachments?: string[];
  replacement?: ObjectId;
}

export const buildLeaveParams = async (
  obj: LeaveType = {},
): Promise<LeaveType> => {
  const user = await userFactory();
  return {
    employee: obj.employee || user._id,
    startDate: obj.startDate || date.past(),
    endDate: obj.endDate || date.future(),
    reason: obj.reason || (await leaveReasonFactory())._id,
    comment: obj.comment || random.words(),
    attachments: obj.attachments || [`${process.env.HOST}/defaults/avatar.jpg`],
    replacement: obj.replacement || user._id,
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
