import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id?: ObjectId;

  token?: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
