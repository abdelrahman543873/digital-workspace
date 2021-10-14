import { Request } from 'express';
import { sign } from 'jsonwebtoken';

export const getAuthToken = (req: Request): string => {
  if (req?.headers?.authorization || req?.headers?.Authorization) {
    let auth: string;
    if (req.headers.authorization) auth = req.headers.authorization;
    if (req.headers.Authorization) auth = <string>req.headers.Authorization;
    return auth.split(' ')[1];
  }
  return null;
};

export const generateAuthToken = (_id: string): string => {
  return sign({ _id }, process.env.JWT_SECRET);
};
