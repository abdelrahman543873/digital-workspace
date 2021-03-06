import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { LEAVE_STATUS } from '../leave.enum';

export type LeaveDocument = Leave & Document;

@Schema({ versionKey: false, timestamps: true })
export class Leave {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  employee: ObjectId;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'LeaveType' })
  type: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'RejectionReason' })
  rejectionReason: ObjectId;

  @Prop()
  comment: string;

  @Prop()
  reason: string;

  @Prop()
  rejectionJustification: string;

  @Prop({ default: LEAVE_STATUS.PENDING })
  status: string;

  @Prop()
  attachments: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  replacement: ObjectId;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
