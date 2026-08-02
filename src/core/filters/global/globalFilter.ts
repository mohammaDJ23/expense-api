import {
    Catch,
    type ExceptionFilter,
    type ArgumentsHost,
    InternalServerErrorException,
} from '@nestjs/common';

import { ExceptionNormalizerService } from '@/core/exceptions/normalizer/exceptionNormalizer.service';
import { HttpResponseEntity } from '@/core/features/responses/http/httpResponse.entity';

import { GlobalFilterFallbackHostStrategy } from './globalFilterFallbackHost.strategy';
import { GlobalFilterHttpHostStrategy } from './globalFilterHttpHost.strategy';

import type { IGlobalFilterHostStrategy } from './globalFilterHostStrategy.interface';

@Catch()
export class GlobalFilter implements ExceptionFilter {
    constructor(
        private readonly globalFilterHttpHostStrategy: GlobalFilterHttpHostStrategy,
        private readonly globalFilterFallbackHostStrategy: GlobalFilterFallbackHostStrategy,
        private readonly exceptionNormalizerService: ExceptionNormalizerService,
    ) {}

    private get hostHandlers(): IGlobalFilterHostStrategy[] {
        return [this.globalFilterHttpHostStrategy, this.globalFilterFallbackHostStrategy];
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        try {
            const handler = this.hostHandlers.find((handler) => handler.canHandle(host));

            if (!handler) {
                throw new InternalServerErrorException('No host handler found.');
            }

            {
                const exceptionData = this.exceptionNormalizerService.normalize(exception);
                const response = HttpResponseEntity.error({
                    data: exceptionData,
                    statusCode: exceptionData.statusCode,
                });

                handler.send(host, response);
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
