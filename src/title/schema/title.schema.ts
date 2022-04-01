import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type TitleDocument = Title & Document;

@Schema({ versionKey: false, timestamps: true })
export class Title {
  _id?: ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  department: ObjectId;
}

export const TitleSchema = SchemaFactory.createForClass(Title);
