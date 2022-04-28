import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema({ versionKey: false, timestamps: true })
export class Team {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  admin: ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  members: ObjectId[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
