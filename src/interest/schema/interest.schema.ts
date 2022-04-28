import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type InterestDocument = Interest & Document;

@Schema({ versionKey: false, timestamps: true })
export class Interest {
  _id?: ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;
}

export const InterestSchema = SchemaFactory.createForClass(Interest);
