import {
    Catch,
    type ExceptionFilter,
    type ArgumentsHost,
    InternalServerErrorException,
} from '@nestjs/common';

import { ExceptionNormalizerService } from '@/core/exceptions/normalizer/exceptionNormalizer.service';
import { HttpResponseEntity } from '@/core/responses/http/httpResponse.entity';

import { GlobalFallbackHostStrategy } from './globalFallbackHost.strategy';
import { GlobalHttpHostStrategy } from './globalHttpHost.strategy';

import type { IGlobalHostStrategy } from './globalHostStrategy.interface';

@Catch()
export class GlobalFilter implements ExceptionFilter {
    constructor(
        private readonly globalHttpHostStrategy: GlobalHttpHostStrategy,
        private readonly globalFallbackHostStrategy: GlobalFallbackHostStrategy,
        private readonly exceptionNormalizerService: ExceptionNormalizerService,
    ) {}

    private get hostHandlers(): IGlobalHostStrategy[] {
        return [this.globalHttpHostStrategy, this.globalFallbackHostStrategy];
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
