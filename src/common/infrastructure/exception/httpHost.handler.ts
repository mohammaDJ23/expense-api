import { Injectable, type ArgumentsHost } from '@nestjs/common';

import type { IHostHandler } from './hostHandler.interface';
import type { ResponseEntity } from '@/common/kernel/entities/response.entity';
import type { IAppException } from '@/common/kernel/exceptions/app/exception.interface';

@Injectable()
export class HttpHostHandler implements IHostHandler {
    canHandle(host: ArgumentsHost): boolean {
        return host.getType() === 'http';
    }

    send(host: ArgumentsHost, response: ResponseEntity<IAppException>): void {
        const ctx = host.switchToHttp();

        ctx.getResponse().status(response.statusCode).json(response);
    }
}
