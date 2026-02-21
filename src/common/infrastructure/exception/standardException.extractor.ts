import { HttpStatus, Injectable } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR } from 'src/common/constants/exception.constants';

import { ExceptionResponseBuilder } from './exceptionResponse.builder';

import type { IExceptionExtractor } from './exceptionExtractor.interface';
import type { IExceptionResponse } from './exceptionResponse.interface';

@Injectable()
export class StandardExceptionExtractor implements IExceptionExtractor {
    canHandle(exception: unknown): boolean {
        return exception instanceof Error;
    }

    extract(exception: unknown): Omit<IExceptionResponse, 'timestamp'> {
        const error = exception as Error;
        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || INTERNAL_SERVER_ERROR;

        return ExceptionResponseBuilder.build(statusCode, message);
    }
}
