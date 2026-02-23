import { HttpException, Injectable } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR } from '@/common/constants/exception.constants';

import { ExceptionResponseBuilder } from './exceptionResponse.builder';

import type { IExceptionExtractor } from './exceptionExtractor.interface';
import type { IExceptionResponse } from './exceptionResponse.interface';

@Injectable()
export class HttpExceptionExtractor implements IExceptionExtractor {
    canHandle(exception: unknown): boolean {
        return exception instanceof HttpException;
    }

    extract(exception: unknown): Omit<IExceptionResponse, 'timestamp'> {
        const httpException = exception as HttpException;
        const response = httpException.getResponse();
        const statusCode = httpException.getStatus();
        const isResponseString = typeof response === 'string';
        const isResponseObject = typeof response === 'object';
        let message: string = INTERNAL_SERVER_ERROR;

        if (isResponseString) {
            message = response;
        } else if (isResponseObject) {
            message = (response as Record<string, string>).message || message;
        }

        return ExceptionResponseBuilder.build(statusCode, message);
    }
}
