import { Injectable } from '@nestjs/common';

import { ExceptionNormalizerEntity } from './exceptionNormalizer.entity';

import type { IExceptionNormalizerStrategy } from './exceptionNormalizerStrategy.interface';

@Injectable()
export class StringExceptionNormalizerStrategy implements IExceptionNormalizerStrategy {
    canHandle(exception: unknown): boolean {
        return typeof exception === 'string';
    }

    normalize(exception: string): ExceptionNormalizerEntity {
        return ExceptionNormalizerEntity.create({
            message: exception,
        });
    }
}
