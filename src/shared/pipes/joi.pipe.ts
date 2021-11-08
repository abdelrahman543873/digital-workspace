import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  private allowUnknown;
  constructor(private schema: ObjectSchema, allowUnknown = false) {
    this.allowUnknown = allowUnknown;
  }

  async transform(value: Record<any, any>): Promise<Record<any, any>> {
    const { error } = this.schema.validate(value, {
      allowUnknown: this.allowUnknown,
    });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}
