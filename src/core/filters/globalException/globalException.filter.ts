import {
    Catch,
    type ExceptionFilter,
    type ArgumentsHost,
    InternalServerErrorException,
} from '@nestjs/common';

import { ExceptionNormalizerService } from '@/core/exceptions/normalizer/exceptionNormalizer.service';
import { HttpResponseEntity } from '@/core/httpResponse/httpResponse.entity';

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
            const response = HttpResponseEntity.error({
                data: exceptionData,
                statusCode: exceptionData.statusCode,
            });

            handler.send(host, response);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
