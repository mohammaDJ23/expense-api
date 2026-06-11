import { HttpStatus, Injectable } from '@nestjs/common';

import { ExceptionNormalizerEntity } from './exceptionNormalizer.entity';
import { INTERNAL_SERVER_ERROR_MESSAGE } from './normalizerException.constant';

import type { IExceptionNormalizerStrategy } from './exceptionNormalizerStrategy.interface';

@Injectable()
export class ObjectExceptionNormalizerStrategy implements IExceptionNormalizerStrategy {
    canHandle(exception: unknown): boolean {
        return (
            exception !== undefined &&
            exception !== null &&
            !Array.isArray(exception) &&
            typeof exception !== 'function' &&
            typeof exception === 'object'
        );
    }

    normalize(exception: Record<string, string | number>): ExceptionNormalizerEntity {
        const message = (exception.message ||
            exception.errorText ||
            exception.textError ||
            exception.text ||
            INTERNAL_SERVER_ERROR_MESSAGE) as string;
        const statusCode = (exception.statusCode ||
            exception.statuscode ||
            exception.code ||
            HttpStatus.INTERNAL_SERVER_ERROR) as number;

        return ExceptionNormalizerEntity.create({
            message,
            statusCode,
        });
    }
}
