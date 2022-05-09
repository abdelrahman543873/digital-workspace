import { TransformFnParams } from 'class-transformer';
import { BaseHttpException } from '../exceptions/base-http-exception';

export const jsonArrayTransform = (params: TransformFnParams) => {
  try {
    if (typeof params.value === 'string') return JSON.parse(params.value);
    return params.value;
  } catch (error) {
    throw new BaseHttpException('EN', 400, 'invalid array input format');
  }
};
