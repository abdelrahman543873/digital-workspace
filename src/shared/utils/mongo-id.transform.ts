import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';
import { isArray, isMongoId } from 'class-validator';
import { Types } from 'mongoose';

export const mongoIdTransform = (params: TransformFnParams) => {
  if (!isMongoId(params.value))
    throw new BadRequestException(`value of ${params.key} isn't a mongoId`);
  return new Types.ObjectId(`${params.value}`);
};

export const mongoIdArrayTransform = (params: TransformFnParams) => {
  const array: [string] = params.value;
  const convertedArray = [];
  if (!isArray(array) || !array.length)
    throw new BadRequestException(
      `value of ${params.key} should be an array with mongoIds`,
    );
  array.forEach((element) => {
    if (!isMongoId(element))
      throw new BadRequestException(`value of ${params.key} isn't a mongoId`);
    convertedArray.push(new Types.ObjectId(`${params.value}`));
  });
  return convertedArray;
};