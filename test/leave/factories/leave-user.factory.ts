import { leaveTypeFactory } from './leave-type.factory';
import { datatype } from 'faker';
import { ObjectId } from 'mongoose';
import { userFactory } from '../../../src/user/user.factory';
import { LeaveUser } from '../../../src/leave/schema/leave-user.schema';
import { leaveUserTestRepo } from '../test-repos/leave-user-test-repo';

interface LeaveUserType {
  user?: ObjectId;
  leaveType?: ObjectId;
  numberOfDays?: number;
}

export const buildLeaveUserParams = async (
  obj: LeaveUserType = {},
): Promise<LeaveUserType> => {
  return {
    user: obj.user || (await userFactory())._id,
    leaveType: obj.leaveType || (await leaveTypeFactory())._id,
    numberOfDays: obj.numberOfDays || datatype.number(),
  };
};

export const leaveUserFactory = async (
  obj: LeaveUserType = {},
): Promise<LeaveUser> => {
  const params: LeaveUserType = await buildLeaveUserParams(obj);
  return await leaveUserTestRepo().add(params);
};
