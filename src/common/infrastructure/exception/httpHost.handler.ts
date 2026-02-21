import { Injectable, type ArgumentsHost } from '@nestjs/common';

import type { IExceptionResponse } from './exceptionResponse.interface';
import type { IHostHandler } from './hostHandler.interface';

@Injectable()
export class HttpHostHandler implements IHostHandler {
    canHandle(host: ArgumentsHost): boolean {
        return host.getType() === 'http';
    }

    send(host: ArgumentsHost, response: IExceptionResponse): void {
        const ctx = host.switchToHttp();

        ctx.getResponse().status(response.statusCode).json(response);
    }
}
