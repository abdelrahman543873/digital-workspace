import { LangEnum } from './../app.const';
import { Request } from 'express';
export interface RequestContext {
  currentUser?: Record<any, any>;
  appContext: Request;
  lang: LangEnum | string;
  long?: number;
  lat?: number;
}
