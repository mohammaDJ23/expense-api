import {
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

        const message = this.reflector.get<string | undefined, string>(
            RESPONSE_MESSAGE_METADATA_KEY,
            handler,
        );
        const statusCode = this.reflector.get<HttpStatus | undefined, string>(
            RESPONSE_STATUS_METADATA_KEY,
            handler,
        );

        return next.handle().pipe(
            // eslint-disable-next-line import-x/no-deprecated
            map((data): ResponseEntity<T> => {
                return ResponseEntity.success({
                    message,
                    statusCode,
                    data,
                });
            }),
        );
    }
}
