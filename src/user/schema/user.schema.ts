import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Allow, IsOptional } from 'class-validator';
import { Document, ObjectId, Types } from 'mongoose';
import { GENDER } from '../../app.const';
import { BLOOD_TYPE, MARTIAL_STATUS, STATUS } from '../user.enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false, _id: false })
export class Experience {
  @Prop()
  logo: string;

  @Prop()
  name: string;

  @Prop()
  position: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema({ versionKey: false, _id: false })
export class Education {
  @Prop()
  logo: string;

  @Prop()
  university: string;

  @Prop()
  major: string;

  @Prop()
  level: string;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

const EducationSchema = SchemaFactory.createForClass(Education);

@Schema({ versionKey: false, timestamps: true })
export class User {
  _id?: ObjectId;

  token?: string;

  @Prop({ unique: true, required: true, trim: true, lowercase: true })
  email: string;

  @Prop({ select: false })
  password?: string;

  @Prop({ sparse: true })
  phone?: string;

  @Prop({ enum: STATUS, default: STATUS.INVITED })
  status: string;

  @Prop()
  fullName: string;

  @Prop({ type: [ExperienceSchema] })
  experience?: Experience[];

  @Prop({ type: [EducationSchema] })
  education?: Education[];

  @Prop()
  description?: string;

  @Prop()
  profilePic?: string;

  @Prop()
  coverPic?: string;

  @Prop({ enum: GENDER })
  gender?: string;

  @Prop({ type: [String] })
  widgets?: string[];

  @Prop({ type: Date })
  birthDate?: string;

  @Prop({ type: Types.ObjectId })
  directManagerId?: Types.ObjectId | ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Level' })
  level?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Country' })
  country?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department' })
  department?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'EmploymentType' })
  employmentType?: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Title' })
  title?: ObjectId;

  @Prop({ type: [Types.ObjectId], ref: 'Skill', default: [] })
  skills?: ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Interest', default: [] })
  interests?: ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  followers?: ObjectId[];

  @Prop({ type: [Types.ObjectId] })
  following?: ObjectId[];

  @Prop()
  nationality?: string;

  @Prop({ type: [Types.ObjectId] })
  hiddenPosts?: ObjectId[];

  @Prop()
  position?: string;

  @Prop()
  linkedin?: string;

  @Prop()
  twitter?: string;

  @Prop({ sparse: true })
  governmentalId?: string;

  @Prop({ sparse: true })
  visa?: string;

  @Prop()
  address?: string;

  @Prop({ type: Date })
  visaExpiryDate?: Date;

  @Prop()
  microsoftToken?: string;

  @Prop({ default: false })
  isCompany?: boolean;

  @Prop({ default: false })
  isAdmin?: boolean;

  @Prop()
  leaveBalance?: number;

  @Prop()
  emergencyContactNumber?: string;

  @Prop({ enum: BLOOD_TYPE })
  bloodGroup?: string;

  @Prop({ enum: MARTIAL_STATUS })
  martialStatus?: string;

  @Prop({ type: Date })
  weddingDate?: Date;

  @Prop()
  yearsOfExperience?: number;

  @Prop({ sparse: true })
  passport?: string;

  @Prop({ type: Date })
  contractEndDate?: Date;

  @Prop({ type: Date })
  internshipEndDate?: Date;

  @Prop({ type: Date })
  exitDate?: Date;

  @Prop({ type: Date })
  resignationDate?: Date;

  @Prop()
  personalEmail?: string;

  @Prop()
  exitReason?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
