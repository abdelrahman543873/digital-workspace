import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type EmploymentTypeDocument = EmploymentType & Document;

@Schema({ versionKey: false, timestamps: true })
export class EmploymentType {
  _id?: ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;
}

export const EmploymentTypeSchema =
  SchemaFactory.createForClass(EmploymentType);
