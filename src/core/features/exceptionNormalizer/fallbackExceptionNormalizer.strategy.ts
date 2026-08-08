import { Injectable } from '@nestjs/common';

import { ExceptionNormalizerEntity } from './exceptionNormalizer.entity';

import type { IExceptionNormalizerStrategy } from './exceptionNormalizerStrategy.interface';

@Injectable()
export class FallbackExceptionNormalizerStrategy implements IExceptionNormalizerStrategy {
    canHandle(): boolean {
        return true;
    }

    normalize(): ExceptionNormalizerEntity {
        return ExceptionNormalizerEntity.create();
    }
}
