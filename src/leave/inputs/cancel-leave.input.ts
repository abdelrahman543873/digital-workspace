import { User } from './../../user/schema/user.schema';
import { mongoIdTransform } from './../../shared/utils/mongo-id.transform';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDefined, Validate } from 'class-validator';
import { ObjectId } from 'mongoose';
import { ValidLeaveCancellationValidator } from '../validators/valid-leave-cancellation.validator';
export class CancelLeaveInput {
  @IsDefined()
  @Transform(mongoIdTransform)
  @ApiProperty({ type: 'string' })
  @Validate(ValidLeaveCancellationValidator)
  id: ObjectId;

  // added by the 'request in body interceptor' to be able to get the user in the input validator
  @ApiProperty({ readOnly: true })
  @Allow()
  currentUser?: User;
}
