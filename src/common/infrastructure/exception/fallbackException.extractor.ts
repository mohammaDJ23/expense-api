import { HttpStatus, Injectable } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR } from '@/common/constants/exception.constants';

import { ExceptionResponseBuilder } from './exceptionResponse.builder';

import type { IExceptionExtractor } from './exceptionExtractor.interface';
import type { IExceptionResponse } from './exceptionResponse.interface';

@Injectable()
export class FallbackExceptionExtractor implements IExceptionExtractor {
    canHandle(): boolean {
        return true;
    }

    extract(): Omit<IExceptionResponse, 'timestamp'> {
        const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        const message = INTERNAL_SERVER_ERROR;

        return ExceptionResponseBuilder.build(statusCode, message);
    }
}
