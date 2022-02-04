import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestContext } from '../request.interface';
import { getId } from 'express-correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: RequestContext, res: Response, next: NextFunction) {
    req.id = getId();
    next();
  }
}
