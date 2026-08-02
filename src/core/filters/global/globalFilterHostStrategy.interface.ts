import type { ExceptionNormalizerEntity } from '@/core/exceptions/normalizer/exceptionNormalizer.entity';
import type { HttpResponseEntity } from '@/core/features/responses/http/httpResponse.entity';
import type { ArgumentsHost } from '@nestjs/common';

export interface IGlobalFilterHostStrategy {
    canHandle(host: ArgumentsHost): boolean;
    send(host: ArgumentsHost, response: HttpResponseEntity<ExceptionNormalizerEntity>): void;
}
