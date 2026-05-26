import { Injectable, type ArgumentsHost } from '@nestjs/common';

import type { IGlobalExceptionHostHandler } from './globalExceptionHostHandler.interface';
import type { ResponseEntity } from '@/common/application/response/response.entity';
import type { IAppException } from '@/core/exceptions/app/exception.interface';

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
