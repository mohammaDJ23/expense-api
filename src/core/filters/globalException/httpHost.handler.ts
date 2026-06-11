import { Injectable, type ArgumentsHost } from '@nestjs/common';

import type { IGlobalExceptionHostHandler } from './globalExceptionHostHandler.interface';
import type { ExceptionNormalizerEntity } from '@/core/exceptions/normalizer/exceptionNormalizer.entity';
import type { HttpResponseEntity } from '@/core/httpResponse/httpResponse.entity';

@Injectable()
export class HttpHostHandler implements IGlobalExceptionHostHandler {
    canHandle(host: ArgumentsHost): boolean {
        return host.getType() === 'http';
    }

    send(host: ArgumentsHost, response: HttpResponseEntity<ExceptionNormalizerEntity>): void {
        const ctx = host.switchToHttp();

        ctx.getResponse().status(response.statusCode).json(response);
    }
}
