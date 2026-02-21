import type { IExceptionResponse } from './exceptionResponse.interface';

export interface IExceptionExtractor {
    canHandle: (exception: unknown) => boolean;
    extract: (exception: unknown) => Omit<IExceptionResponse, 'timestamp'>;
}
