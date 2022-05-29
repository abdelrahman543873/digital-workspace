import { ObjectId } from 'mongoose';

export class AddUserLeaveInput {
  user: ObjectId;
  leaveType: ObjectId;
  numberOfDays: number;
}
