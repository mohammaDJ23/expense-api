import { plainToClass } from 'class-transformer';
// eslint-disable-next-line import-x/no-deprecated
import { map, type Observable } from 'rxjs';

import type { TClassConstructor } from '@/common/common.types';
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class SerializerInterceptor implements NestInterceptor {
    constructor(private readonly dto: TClassConstructor) {}

    intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            // eslint-disable-next-line import-x/no-deprecated
            map((data: unknown) => {
                return this.transformValue(data);
            }),
        );
    }

    private transformValue(value: unknown): unknown {
        if (value === null || value === undefined) {
            return value;
        }

        if (Array.isArray(value)) {
            return value.map((item) => this.transformValue(item));
        }

        if (
            typeof value === 'object' &&
            !(value instanceof Date) &&
            !(value instanceof String) &&
            !(value instanceof Boolean) &&
            !(value instanceof Number)
        ) {
            return plainToClass(this.dto, value, {
                excludeExtraneousValues: true,
            });
        }

        return value;
    }
}
