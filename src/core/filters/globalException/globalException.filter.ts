import {
    Catch,
    type ExceptionFilter,
    type ArgumentsHost,
    InternalServerErrorException,
} from '@nestjs/common';

import { ResponseEntity } from '@/common/application/response/response.entity';
import { ExceptionNormalizerService } from '@/core/exceptions/normalizer/exceptionNormalizer.service';

import { FallbackHostHandler } from './fallbackHost.handler';
import { HttpHostHandler } from './httpHost.handler';

import type { IGlobalExceptionHostHandler } from './globalExceptionHostHandler.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly httpHostHandler: HttpHostHandler,
        private readonly fallbackHostHandler: FallbackHostHandler,
        private readonly exceptionNormalizerService: ExceptionNormalizerService,
    ) {}

    private get hostHandlers(): IGlobalExceptionHostHandler[] {
        return [this.httpHostHandler, this.fallbackHostHandler];
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        try {
            const handler = this.hostHandlers.find((handler) => handler.canHandle(host));

            if (!handler) {
                throw new InternalServerErrorException('No host handler found.');
            }

            const exceptionData = this.exceptionNormalizerService.normalize(exception);
            const response = ResponseEntity.error({
                data: exceptionData,
                statusCode: exceptionData.statusCode,
            });

            handler.send(host, response);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
