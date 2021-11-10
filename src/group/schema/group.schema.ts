import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ versionKey: false, timestamps: true })
export class Group {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  admin: ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
