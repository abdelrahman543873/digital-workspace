import { Request } from 'express';
import { extname } from 'path';
export const filename = (
  req: Request,
  file,
  cb: (error: Error | null, filename: string) => void,
): void => {
  return cb(null, `${Date.now()}${extname(file.originalname)}`);
};
