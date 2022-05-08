import { TransformFnParams } from 'class-transformer';

export const jsonArrayTransform = (params: TransformFnParams) => {
  if (typeof params.value === 'string') return JSON.parse(params.value);
  return params.value;
};
