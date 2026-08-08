import { Injectable } from '@nestjs/common';

import { ExceptionNormalizerEntity } from './exceptionNormalizer.entity';

import type { IExceptionNormalizerStrategy } from './exceptionNormalizerStrategy.interface';

@Injectable()
export class ErrorExceptionNormalizerStrategy implements IExceptionNormalizerStrategy {
    canHandle(exception: unknown): boolean {
        return exception instanceof Error;
    }

    normalize(exception: Error): ExceptionNormalizerEntity {
        return ExceptionNormalizerEntity.create({
            message: exception.message,
        });
    }
}
