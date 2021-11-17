import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ versionKey: false, timestamps: true })
export class Event {
  _id?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  host: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  logo: string;

  @Prop({ required: true })
  date: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  attendees: ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
