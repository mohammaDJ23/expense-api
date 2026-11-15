import { Injectable, type ArgumentsHost } from '@nestjs/common';

import type { IGlobalFilterHostStrategy } from './globalFilterHostStrategy.interface';
import type { ExceptionNormalizerEntity } from '@/core/features/exceptionNormalizer/exceptionNormalizer.entity';
import type { HttpResponseEntity } from '@/core/features/responses/http/httpResponse.entity';
import type { Response } from 'express';

@Injectable()
export class GlobalFilterHttpHostStrategy implements IGlobalFilterHostStrategy {
    canHandle(host: ArgumentsHost): boolean {
        return host.getType() === 'http';
    }

    send(host: ArgumentsHost, response: HttpResponseEntity<ExceptionNormalizerEntity>): void {
        const httpResponse = host.switchToHttp().getResponse<Response>();

        if (httpResponse.headersSent) {
            return;
        }

        httpResponse.status(response.statusCode).json(response);
    }
}
