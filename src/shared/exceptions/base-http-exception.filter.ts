import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseHttpException } from './base-http-exception';
import { ExceptionInterface } from './exception.interface';
@Catch(BaseHttpException)
export class BaseHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = exception.getResponse() as ExceptionInterface;
    response.status(exception.getStatus()).json({
      success: false,
      ...(typeof errorResponse === 'string'
        ? { message: errorResponse }
        : errorResponse),
    });
  }
}
