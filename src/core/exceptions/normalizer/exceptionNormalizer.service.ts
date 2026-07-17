import { Injectable } from '@nestjs/common';

import { ErrorExceptionNormalizerStrategy } from './errorExceptionNormalizer.strategy';
import { FallbackExceptionNormalizerStrategy } from './fallbackExceptionNormalizer.strategy';
import { HttpExceptionNormalizerStrategy } from './httpExceptionNormalizer.strategy';
import { ObjectExceptionNormalizerStrategy } from './objectExceptionNormalizer.strategy';
import { StringExceptionNormalizerStrategy } from './stringExceptionNormalizer.strategy';

import type { ExceptionNormalizerEntity } from './exceptionNormalizer.entity';
import type { IExceptionNormalizerStrategy } from './exceptionNormalizerStrategy.interface';

@Injectable()
export class ExceptionNormalizerService {
    constructor(
        private readonly httpExceptionNormalizer: HttpExceptionNormalizerStrategy,
        private readonly errorExceptionNormalizer: ErrorExceptionNormalizerStrategy,
        private readonly stringExceptionNormalizer: StringExceptionNormalizerStrategy,
        private readonly objectExceptionNormalizer: ObjectExceptionNormalizerStrategy,
        private readonly fallbackExceptionNormalizer: FallbackExceptionNormalizerStrategy,
    ) {}

    private getExceptionStrategies(): IExceptionNormalizerStrategy[] {
        return [
            this.httpExceptionNormalizer,
            this.errorExceptionNormalizer,
            this.stringExceptionNormalizer,
            this.objectExceptionNormalizer,
            this.fallbackExceptionNormalizer,
        ];
    }

    normalize(exception: unknown): ExceptionNormalizerEntity {
        const strategy = this.getExceptionStrategies().find((strategy) =>
            strategy.canHandle(exception),
        );
        if (strategy) {
            return strategy.normalize(exception);
        }
        return this.fallbackExceptionNormalizer.normalize();
    }
}
