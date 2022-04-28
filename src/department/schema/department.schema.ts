import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type DepartmentDocument = Department & Document;

@Schema({ versionKey: false, timestamps: true })
export class Department {
  _id?: ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
