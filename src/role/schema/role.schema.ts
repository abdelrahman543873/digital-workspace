import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({ versionKey: false, timestamps: true })
export class Role {
  _id?: ObjectId;

  @Prop({ unique: true })
  name: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
