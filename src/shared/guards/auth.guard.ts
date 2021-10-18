import { LangEnum } from './../../app.const';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BaseHttpException } from '../exceptions/base-http-exception';
import { HelperService } from '../helper/helper.service';
import { RequestContext } from '../request.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private helperService: HelperService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestContext>();
    request.appContext = request['raw'];
    request.lang =
      request?.appContext?.headers?.['accept-language'] ?? LangEnum.EN;
    const currentUser = await this.helperService.getCurrentUser(
      request.appContext,
    );
    if (!currentUser) throw new BaseHttpException(request.lang, 600);
    request.currentUser = currentUser;
    return true;
  }
}
