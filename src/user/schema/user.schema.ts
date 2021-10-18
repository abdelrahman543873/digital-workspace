import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Exclude } from 'class-transformer';
export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id?: ObjectId;

  token?: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Exclude()
  @Prop({ unique: true, required: true })
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
