import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { GENDER } from '../../app.const';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id?: ObjectId;

  token?: string;

  @Prop({ unique: true, required: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ sparse: true })
  phone: string;

  @Prop()
  username: string;

  @Prop()
  experience: string;

  @Prop()
  description: string;

  @Prop()
  profilePic: string;

  @Prop()
  coverPic: string;

  @Prop({ enum: GENDER })
  gender: string;

  @Prop({ type: [String] })
  widgets: string[];

  @Prop({ type: Date })
  birthDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  directManagerId: ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  followers: ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  following: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
