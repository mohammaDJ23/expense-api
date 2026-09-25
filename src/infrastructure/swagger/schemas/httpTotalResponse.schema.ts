import { getSchemaPath } from '@nestjs/swagger';

import { TotalResponseDto } from '@/core/dtos/total.response.dto';
import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';

// eslint-disable-next-line sonarjs/no-internal-api-use
import type { SchemaObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function httpTotalResponseSwaggerSchema(): SchemaObject {
    return {
        allOf: [
            {
                $ref: getSchemaPath(HttpResponseDto),
            },
            {
                type: 'object',
                properties: {
                    data: {
                        $ref: getSchemaPath(TotalResponseDto),
                    },
                },
            },
        ],
    };
}
