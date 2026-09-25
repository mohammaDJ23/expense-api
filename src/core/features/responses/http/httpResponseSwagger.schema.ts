import { composeSchema } from '@/infrastructure/swagger/schemas/compose.schema';

import { HttpResponseDto } from './httpResponse.dto';

import type { TSwaggerSchema } from '@/infrastructure/swagger/schemas/schema.type';
// eslint-disable-next-line sonarjs/no-internal-api-use
import type { SchemaObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function httpResponseSwaggerSchema(schema: TSwaggerSchema): SchemaObject {
    return composeSchema(HttpResponseDto, {
        data: schema,
    });
}
