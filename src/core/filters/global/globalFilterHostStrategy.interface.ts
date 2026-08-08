import type { ExceptionNormalizerEntity } from '@/core/features/exceptionNormalizer/exceptionNormalizer.entity';
import type { HttpResponseEntity } from '@/core/features/responses/http/httpResponse.entity';
import type { ArgumentsHost } from '@nestjs/common';

export interface IGlobalFilterHostStrategy {
    canHandle(host: ArgumentsHost): boolean;
    send(host: ArgumentsHost, response: HttpResponseEntity<ExceptionNormalizerEntity>): void;
}
