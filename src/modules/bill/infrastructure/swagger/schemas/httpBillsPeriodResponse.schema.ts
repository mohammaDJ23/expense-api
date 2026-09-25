import { getSchemaPath } from '@nestjs/swagger';

import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { FindBillsPeriodResponseDto } from '@/modules/bill/interface/dtos/findBillsPeriod.response.dto';

// eslint-disable-next-line sonarjs/no-internal-api-use
import type { SchemaObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function httpBillsPeriodResponseSwaggerSchema(): SchemaObject {
    return {
        allOf: [
            {
                $ref: getSchemaPath(HttpResponseDto),
            },
            {
                type: 'object',
                properties: {
                    data: {
                        $ref: getSchemaPath(FindBillsPeriodResponseDto),
                    },
                },
            },
        ],
    };
}
