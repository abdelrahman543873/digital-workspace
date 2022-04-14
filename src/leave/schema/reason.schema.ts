import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type LeaveReasonDocument = LeaveReason & Document;

@Schema({ versionKey: false, timestamps: true })
export class LeaveReason {
  _id?: ObjectId;

  @Prop()
  reason: string;
}

export const LeaveReasonSchema = SchemaFactory.createForClass(LeaveReason);
