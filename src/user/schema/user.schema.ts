import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
