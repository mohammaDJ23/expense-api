import { Injectable, type ArgumentsHost } from '@nestjs/common';

import type { ResponseEntity } from '@/common/kernel/entities/response.entity';
import type { IAppException } from '@/common/kernel/interfaces/appException.interface';
import type { IGlobalExceptionHostHandler } from '@/common/kernel/interfaces/globalExceptionHostHandler.interface';

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
