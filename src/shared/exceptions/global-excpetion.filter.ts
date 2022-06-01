import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception.message ||
      exception.message?.['error'] ||
      'Internal server error';
    if (httpStatus === 400)
      response.status(httpStatus).json({
        ...exception['response'],
      });
    else
      response.status(httpStatus).json({
        success: false,
        error: message,
      });
  }
}
