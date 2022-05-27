import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';
import { isArray, isMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { BaseHttpException } from '../exceptions/base-http-exception';

export const mongoIdTransform = (params: TransformFnParams) => {
  if (!isMongoId(params.value))
    throw new BadRequestException(`value of ${params.key} isn't a mongoId`);
  return new Types.ObjectId(`${params.value}`);
};

export const mongoIdArrayTransform = (params: TransformFnParams) => {
  // for working with parsing form data
  try {
    const array: [string] =
      typeof params.value === 'string'
        ? JSON.parse(params.value)
        : params.value;
    const convertedArray = [];
    if (!isArray(array))
      throw new BadRequestException(
        `value of ${params.key} should be an array with mongoIds`,
      );
    array.forEach((element) => {
      if (!isMongoId(element))
        throw new BadRequestException(`value of ${params.key} isn't a mongoId`);
      convertedArray.push(new Types.ObjectId(element));
    });
    return convertedArray;
  } catch (error) {
    throw new BaseHttpException('EN', 400, 'invalid array input format');
  }
};
