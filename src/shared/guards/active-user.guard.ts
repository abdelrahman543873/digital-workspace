import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { HelperService } from '../helper/helper.service';
import { RequestContext } from '../request.interface';
import { STATUS } from '../../user/user.enum';

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(private helperService: HelperService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    request.appContext = request['headers'];
    const currentUser = await this.helperService.getCurrentUser(
      request.appContext,
    );
    if (!currentUser) throw new BaseHttpException(request.lang, 600);
    if (currentUser.status === STATUS.INACTIVE)
      throw new BaseHttpException(request.lang, 617);
    return true;
  }
}
