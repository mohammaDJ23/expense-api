import { Injectable, type ArgumentsHost } from '@nestjs/common';

import type { IGlobalExceptionHostHandler } from './globalExceptionHostHandler.interface';
import type { IAppException } from '@/common/infrastructure/core/exceptions/app/exception.interface';
import type { ResponseEntity } from '@/common/kernel/response/response.entity';

@Injectable()
export class HttpHostHandler implements IGlobalExceptionHostHandler {
    canHandle(host: ArgumentsHost): boolean {
        return host.getType() === 'http';
    }

    send(host: ArgumentsHost, response: ResponseEntity<IAppException>): void {
        const ctx = host.switchToHttp();

        ctx.getResponse().status(response.statusCode).json(response);
    }
}
