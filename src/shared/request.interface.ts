import { LangEnum } from './../app.const';
import { User } from '../user/schema/user.schema';
import { IncomingHttpHeaders } from 'http';
export interface RequestContext {
  currentUser?: User;
  appContext: IncomingHttpHeaders;
  lang: LangEnum | string;
  long?: number;
  lat?: number;
}
