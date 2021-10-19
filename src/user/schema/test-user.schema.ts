import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestUserDocument = TestUser & Document;

@Schema({ versionKey: false, timestamps: true })
export class TestUser {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;
}

export const TestUserSchema = SchemaFactory.createForClass(TestUser);
