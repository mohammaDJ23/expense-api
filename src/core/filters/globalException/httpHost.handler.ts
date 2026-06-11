import { Injectable, type ArgumentsHost } from '@nestjs/common';

import type { IGlobalExceptionHostHandler } from './globalExceptionHostHandler.interface';
import type { ResponseEntity } from '@/common/application/response/response.entity';
import type { ExceptionNormalizerEntity } from '@/core/exceptions/normalizer/exceptionNormalizer.entity';

@Injectable()
export class HttpHostHandler implements IGlobalExceptionHostHandler {
    canHandle(host: ArgumentsHost): boolean {
        return host.getType() === 'http';
    }

    send(host: ArgumentsHost, response: ResponseEntity<ExceptionNormalizerEntity>): void {
        const ctx = host.switchToHttp();

        ctx.getResponse().status(response.statusCode).json(response);
    }
}
