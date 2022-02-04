import { Logform } from 'winston';

export const logTransform = (info: Logform.TransformableInfo): string => {
  const { level, message } = info;
  return `${level}:${message}`;
};
