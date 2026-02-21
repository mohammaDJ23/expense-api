import { ExceptionFilter as GlobalExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

import { ExceptionResponseBuilder } from './exceptionResponse.builder';
import { FallbackExceptionExtractor } from './fallbackException.extractor';
import { FallbackHostHandler } from './fallbackHost.handler';
import { HttpExceptionExtractor } from './httpException.extractor';
import { HttpHostHandler } from './httpHost.handler';
import { StandardExceptionExtractor } from './standardException.extractor';

import type { IExceptionExtractor } from './exceptionExtractor.interface';
import type { IExceptionResponse } from './exceptionResponse.interface';
import type { IHostHandler } from './hostHandler.interface';

@Catch()
export class ExceptionFilter implements GlobalExceptionFilter {
    // eslint-disable-next-line max-params
    constructor(
        private readonly httpExceptionExtractor: HttpExceptionExtractor,
        private readonly standardExceptionExtractor: StandardExceptionExtractor,
        private readonly fallbackExceptionExtractor: FallbackExceptionExtractor,

        private readonly httpHostHandler: HttpHostHandler,
        private readonly fallbackHostHandler: FallbackHostHandler,
    ) {}

    private get exceptionExtractors(): IExceptionExtractor[] {
        return [
            this.httpExceptionExtractor,
            this.standardExceptionExtractor,
            this.fallbackExceptionExtractor,
        ];
    }

    private get hostHandlers(): IHostHandler[] {
        return [this.httpHostHandler, this.fallbackHostHandler];
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        try {
            const extractor = this.exceptionExtractors.find((extractor) =>
                extractor.canHandle(exception),
            );

            if (!extractor) {
                throw new Error('No extractor for exception handling found.');
            }

            const exceptionDetails = extractor.extract(exception);

            const response: IExceptionResponse = ExceptionResponseBuilder.buildWithTimestamp(
                exceptionDetails.statusCode,
                exceptionDetails.message,
            );

            const handler = this.hostHandlers.find((handler) => handler.canHandle(host));

            if (!handler) {
                throw new Error('No host handler for exception handling found.');
            }

            handler.send(host, response);
        } catch (error) {
            console.error(error);
        }
    }
}
