import type { ExceptionNormalizerEntity } from '@/core/exceptions/normalizer/exceptionNormalizer.entity';
import type { HttpResponseEntity } from '@/core/httpResponse/httpResponse.entity';
import type { ArgumentsHost } from '@nestjs/common';

export interface IGlobalExceptionHostHandler {
    canHandle(host: ArgumentsHost): boolean;
    send(host: ArgumentsHost, response: HttpResponseEntity<ExceptionNormalizerEntity>): void;
}
