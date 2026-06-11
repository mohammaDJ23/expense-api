import { HttpException, Injectable } from '@nestjs/common';

import { ExceptionNormalizerEntity } from './exceptionNormalizer.entity';
import { INTERNAL_SERVER_ERROR_MESSAGE } from './normalizerException.constants';

import type { IExceptionNormalizerStrategy } from './exceptionNormalizerStrategy.interface';

@Injectable()
export class HttpExceptionNormalizerStrategy implements IExceptionNormalizerStrategy {
    canHandle(exception: unknown): boolean {
        return exception instanceof HttpException;
    }

    normalize(exception: HttpException): ExceptionNormalizerEntity {
        const response = exception.getResponse();

        let message = INTERNAL_SERVER_ERROR_MESSAGE;
        if (typeof response === 'string') {
            message = response;
        } else if (typeof response === 'object') {
            message = (response as Record<string, string>).message || message;
        }

        const statusCode = exception.getStatus();

        return ExceptionNormalizerEntity.create({
            message,
            statusCode,
        });
    }
}
