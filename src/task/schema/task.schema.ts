import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { PRIORITIES, TASK_STATUS } from '../../app.const';

export type TaskDocument = Task & Document;

@Schema({ versionKey: false, timestamps: true })
export class Task {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assigner: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  assignee: ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: PRIORITIES })
  priority: string;

  @Prop({ enum: TASK_STATUS })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
