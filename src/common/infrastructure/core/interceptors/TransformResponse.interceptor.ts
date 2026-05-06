import {
    BadRequestException,
    HttpStatus,
    Injectable,
    type CallHandler,
    type ExecutionContext,
    type NestInterceptor,
} from '@nestjs/common';
// eslint-disable-next-line import-x/no-deprecated
import { map } from 'rxjs/operators';

import {
    RESPONSE_MESSAGE_METADATA_KEY,
    RESPONSE_STATUS_METADATA_KEY,
} from '@/common/infrastructure/core/constants/responseMetadata.constant';
import { ResponseEntity } from '@/common/kernel/response/response.entity';

import type { Reflector } from '@nestjs/core';
import type { Observable } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, ResponseEntity<T>> {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseEntity<T>> {
        const handler = context.getHandler();
        const controller = context.getClass();

        const controllerName = controller.name;
        const handlerName = handler.name;

        const message = this.getMessage(controllerName, handlerName, handler);
        const statusCode = this.getStatusCode(controllerName, handlerName, handler);

        // eslint-disable-next-line import-x/no-deprecated
        return next.handle().pipe(map(this.transformResponse(message, statusCode)));
    }

    private getMessage(controllerName: string, handlerName: string, handler: Function): string {
        const message = this.reflector.get<string | undefined, string>(
            RESPONSE_MESSAGE_METADATA_KEY,
            handler,
        );
        if (!message) {
            const errorMessage = `Missing @ResponseMessage() decorator or empty mesasge on ${controllerName}.${handlerName}() route. Please add @ResponseMessage('Your message') to this endpoint.`;
            throw new BadRequestException(errorMessage);
        }
        return message;
    }

    private getStatusCode(
        controllerName: string,
        handlerName: string,
        handler: Function,
    ): HttpStatus {
        const statusCode = this.reflector.get<HttpStatus | undefined, string>(
            RESPONSE_STATUS_METADATA_KEY,
            handler,
        );
        if (!statusCode) {
            const errorMessage = `Missing @ResponseStatus() decorator or empty status code on ${controllerName}.${handlerName}() route. Please add @ResponseStatus(HttpStatus.XXX) to this endpoint.`;
            throw new BadRequestException(errorMessage);
        }
        return statusCode;
    }

    private transformResponse(
        message: string,
        statusCode: HttpStatus,
    ): (data: T) => ResponseEntity<T> {
        return function response(data): ResponseEntity<T> {
            return ResponseEntity.success({
                message,
                statusCode,
                data,
            });
        };
    }
}
