import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Error } from 'mongoose';

@Catch(Error)
export class ValidationMongooseError implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.send({
      success: false,
      statusCode: 400,
      exception: exception.message,
    });
  }
}
