import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';

@Catch(QueryFailedError, EntityNotFoundError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const { url } = request;
    const message = exception.message;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      message: message,
    };

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
