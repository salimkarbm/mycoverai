import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import logger from 'src/core/utils/logger/index';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const path = ctx.getRequest().path;

    logger.error({
      message: exception.response?.message || 'Internal Server Error',
      error: exception.message,
      path,
    });

    response.status(exception.status || 500).json({
      statusCode: exception.status || 500,
      message: exception.response?.message || 'Internal Server Error',
      error: exception.message,
    });
  }
}
