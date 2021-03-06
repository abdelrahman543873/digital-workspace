import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestUserDocument = TestUser & Document;

@Schema({ versionKey: false, timestamps: true })
export class TestUser {
  @Prop({ unique: true, required: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const TestUserSchema = SchemaFactory.createForClass(TestUser);
