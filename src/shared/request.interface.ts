import { LangEnum } from './../app.const';
import { User } from '../user/schema/user.schema';
import { IncomingHttpHeaders } from 'http';
import { Request } from 'express';
export interface RequestContext extends Request {
  currentUser?: User;
  appContext: IncomingHttpHeaders;
  lang: LangEnum | string;
  long?: number;
  lat?: number;
  id: string;
}
