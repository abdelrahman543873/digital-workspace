import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, Types, Document } from 'mongoose';

export type LeaveUserDocument = LeaveUser & Document;

@Schema({ versionKey: false, timestamps: true })
export class LeaveUser {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LeaveType' })
  leaveType: ObjectId;

  @Prop()
  numberOfDays: number;
}

export const LeaveUserSchema = SchemaFactory.createForClass(LeaveUser);
