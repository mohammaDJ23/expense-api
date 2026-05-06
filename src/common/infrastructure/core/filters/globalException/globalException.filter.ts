import { Catch, type ExceptionFilter, type ArgumentsHost } from '@nestjs/common';

import { AppException } from '@/common/infrastructure/core/exceptions/app/exception';
import { ResponseEntity } from '@/common/kernel/response/response.entity';

import { FallbackHostHandler } from './fallbackHost.handler';
import { HttpHostHandler } from './httpHost.handler';

import type { IGlobalExceptionHostHandler } from './globalExceptionHostHandler.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpHostHandler: HttpHostHandler,
        private readonly fallbackHostHandler: FallbackHostHandler,
    ) {}

    private get hostHandlers(): IGlobalExceptionHostHandler[] {
        return [this.httpHostHandler, this.fallbackHostHandler];
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        try {
            const handler = this.hostHandlers.find((handler) => handler.canHandle(host));

            if (!handler) {
                throw new AppException('No host handler for exception handling found.');
            }

            const exceptionData = new AppException(exception);
            const response = ResponseEntity.error({
                data: exceptionData,
                statusCode: exceptionData.statusCode,
            });

            handler.send(host, response);
        } catch (error) {
            console.error(error);
        }
    }
}
