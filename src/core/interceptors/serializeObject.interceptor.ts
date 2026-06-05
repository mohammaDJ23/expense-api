import {
    InternalServerErrorException,
    type CallHandler,
    type ExecutionContext,
    type NestInterceptor,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
// eslint-disable-next-line import-x/no-deprecated
import { map, type Observable } from 'rxjs';

import type { TClassConstructor } from '@/common/types';

export class SerializeObjectInterceptor<T> implements NestInterceptor {
    constructor(private readonly dto: TClassConstructor<T>) {}

    intercept(_: ExecutionContext, next: CallHandler): Observable<T> {
        return next.handle().pipe(
            // eslint-disable-next-line import-x/no-deprecated
            map((data: unknown): T => {
                const isValid =
                    data !== null &&
                    typeof data !== 'function' &&
                    typeof data === 'object' &&
                    !Array.isArray(data) &&
                    !(data instanceof String) &&
                    !(data instanceof Boolean) &&
                    !(data instanceof Number) &&
                    !(data instanceof Date);
                if (!isValid) {
                    throw new InternalServerErrorException(
                        `@SerializeObjectInterceptor() expects an object but received ${typeof data}`,
                    );
                }
                return plainToClass(this.dto, data, {
                    excludeExtraneousValues: true,
                });
            }),
        );
    }
}
