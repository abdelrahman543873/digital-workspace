import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type LeaveReasonDocument = LeaveType & Document;

@Schema({ versionKey: false, timestamps: true })
export class LeaveType {
  _id?: ObjectId;

  @Prop()
  reason: string;
}

export const LeaveTypeSchema = SchemaFactory.createForClass(LeaveType);
