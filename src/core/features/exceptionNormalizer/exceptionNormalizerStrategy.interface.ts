import type { ExceptionNormalizerEntity } from './exceptionNormalizer.entity';

export interface IExceptionNormalizerStrategy {
    canHandle(exception: unknown): boolean;
    normalize(exception: unknown): ExceptionNormalizerEntity;
}
