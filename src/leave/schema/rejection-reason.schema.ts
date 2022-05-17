import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type RejectionReasonDocument = RejectionReason & Document;

@Schema({ versionKey: false, timestamps: true })
export class RejectionReason {
  _id?: ObjectId;

  @Prop({ unique: true })
  name: string;
}

export const RejectionReasonSchema =
  SchemaFactory.createForClass(RejectionReason);
