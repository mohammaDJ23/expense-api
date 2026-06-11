import {
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    type CallHandler,
    type ExecutionContext,
    type NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// eslint-disable-next-line import-x/no-deprecated
import { map } from 'rxjs/operators';

import {
    HTTP_RESPONSE_MESSAGE_METADATA_KEY,
    HTTP_RESPONSE_STATUS_METADATA_KEY,
} from '@/core/httpResponse/httpResponse.constant';
import { HttpResponseEntity } from '@/core/httpResponse/httpResponse.entity';

import type { Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, HttpResponseEntity<T>> {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<HttpResponseEntity<T>> {
        const handler = context.getHandler();
        const controller = context.getClass();

        const message = this.reflector.get<string | undefined, string>(
            HTTP_RESPONSE_MESSAGE_METADATA_KEY,
            handler,
        );
        if (!message) {
            throw new InternalServerErrorException(
                `@ResponseMessage Missing required decorator on ${controller.name}.${handler.name}. Please add @ResponseMessage('Your success message') decorator to this endpoint.`,
            );
        }

        const statusCode = this.reflector.get<HttpStatus | undefined, string>(
            HTTP_RESPONSE_STATUS_METADATA_KEY,
            handler,
        );
        if (!statusCode) {
            throw new InternalServerErrorException(
                `@ResponseStatusCode Missing required decorator on ${controller.name}.${handler.name}. Please add @ResponseStatusCode(HttpStatus.YOUR_STATUS) decorator to this endpoint.`,
            );
        }

        return next.handle().pipe(
            // eslint-disable-next-line import-x/no-deprecated
            map((data): HttpResponseEntity<T> => {
                return HttpResponseEntity.success<T>({
                    message,
                    statusCode,
                    data,
                });
            }),
        );
    }
}
