import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { ACCRUAL_ENUM } from '../leave.enum';
import { GENDER } from '../../app.const';

export type LeaveCriteriaDocument = LeaveCriteria & Document;

@Schema({ versionKey: false, timestamps: true })
export class LeaveCriteria {
  _id?: ObjectId;

  @Prop({ unique: true, type: Types.ObjectId, ref: 'LeaveType' })
  leaveTypeId: ObjectId;

  @Prop({ enum: ACCRUAL_ENUM })
  accrual: string;

  @Prop()
  startingMonth: number;

  @Prop()
  maximumDays: number;

  @Prop({ type: Date })
  effectiveDate: Date;

  @Prop({ type: [Types.ObjectId], ref: 'Country' })
  countries?: ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Department' })
  departments?: ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'EmploymentType' })
  employmentTypes?: ObjectId[];

  @Prop({ enum: GENDER })
  gender: string;

  @Prop()
  isCarriedOver: boolean;

  @Prop()
  isHolidaysIncluded: boolean;

  @Prop()
  isContinuousAllowed: boolean;

  @Prop()
  isNegativeBalanceAllowed: boolean;

  @Prop()
  isAttachmentAllowed: boolean;
}

export const LeaveCriteriaSchema = SchemaFactory.createForClass(LeaveCriteria);
