import { getSchemaPath } from '@nestjs/swagger';

import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';

// eslint-disable-next-line sonarjs/no-internal-api-use
import type { SchemaObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function httpConsumersResponseSwaggerSchema(): SchemaObject {
    return {
        allOf: [
            {
                $ref: getSchemaPath(HttpResponseDto),
            },
            {
                type: 'object',
                properties: {
                    data: {
                        type: 'array',
                        items: {
                            $ref: getSchemaPath(ConsumerResponseDto),
                        },
                    },
                },
            },
        ],
    };
}
