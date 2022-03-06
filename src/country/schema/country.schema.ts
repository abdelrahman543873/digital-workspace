import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type CountryDocument = Country & Document;

@Schema({ versionKey: false, timestamps: true })
export class Country {
  _id?: ObjectId;

  @Prop({ unique: true })
  name: string;

  @Prop()
  logo: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
