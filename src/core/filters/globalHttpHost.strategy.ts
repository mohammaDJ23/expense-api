import { Injectable, type ArgumentsHost } from '@nestjs/common';

import type { IGlobalHostStrategy } from './globalHostStrategy.interface';
import type { ExceptionNormalizerEntity } from '@/core/exceptions/normalizer/exceptionNormalizer.entity';
import type { HttpResponseEntity } from '@/core/responses/http/httpResponse.entity';

@Injectable()
export class GlobalHttpHostStrategy implements IGlobalHostStrategy {
    canHandle(host: ArgumentsHost): boolean {
        return host.getType() === 'http';
    }

    send(host: ArgumentsHost, response: HttpResponseEntity<ExceptionNormalizerEntity>): void {
        const ctx = host.switchToHttp();

        ctx.getResponse().status(response.statusCode).json(response);
    }
}
