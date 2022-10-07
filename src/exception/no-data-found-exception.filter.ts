import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NoDataFoundException } from '@/exception/no-data-found.exception';
import { Response } from 'express';

@Catch(NoDataFoundException)
export class NoDataFoundExceptionFilter
  implements ExceptionFilter<NoDataFoundException>
{
  catch(exception: NoDataFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 400;

    response.status(status).json({
      message: exception.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      data: {
        id: exception.id,
        entity: exception.entity.prototype.constructor.name,
      },
    });
  }
}
