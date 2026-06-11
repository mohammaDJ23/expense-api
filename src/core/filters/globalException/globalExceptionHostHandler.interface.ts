import type { ResponseEntity } from '@/common/application/response/response.entity';
import type { ExceptionNormalizerEntity } from '@/core/exceptions/normalizer/exceptionNormalizer.entity';
import type { ArgumentsHost } from '@nestjs/common';

export interface IGlobalExceptionHostHandler {
    canHandle(host: ArgumentsHost): boolean;
    send(host: ArgumentsHost, response: ResponseEntity<ExceptionNormalizerEntity>): void;
}
