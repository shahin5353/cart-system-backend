import { ErrorResponse } from './../models/ErrorResponse';
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    BadRequestException,
    NotFoundException,
    ForbiddenException
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import CommonException from '../models/CommonException';
import ErrorMessages from '../utils/ErrorMessages';


//Catch All Exception occurred all over app
@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        console.log(exception);

        let errorMessage: any =
            exception instanceof HttpException ? exception.getResponse() : exception.message;

        if (exception instanceof QueryFailedError) {
            console.log('this is a database level error', exception);
        }

        if (exception instanceof BadRequestException) {
            const errors: any = exception.getResponse();
            if (errors.message && errors.message.length > 0) errorMessage = errors.message[0];
            else errorMessage = 'Bad Request';
        }

        if (exception instanceof CommonException) {
            errorMessage = exception.errorMessage
                ? exception.errorMessage
                : ErrorMessages.getMessage(exception.errorCode);
        }

        if (exception instanceof NotFoundException) {
            errorMessage = exception.message;
        }

        const status =
            exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        response
            .status(status)
            .json(
                new ErrorResponse(
                    status,
                    exception.errorCode,
                    errorMessage,
                    request.url,
                    new Date().toISOString()
                )
            );
    }
}
