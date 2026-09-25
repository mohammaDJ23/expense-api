import { getSchemaPath } from '@nestjs/swagger';

import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
import { FindConsumerListResponseDto } from '@/modules/consumer/interfaces/dtos/findConsumerList.response.dto';

// eslint-disable-next-line sonarjs/no-internal-api-use
import type { SchemaObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function httpConsumerListResponseSwaggerSchema(): SchemaObject {
    return {
        allOf: [
            {
                $ref: getSchemaPath(HttpResponseDto),
            },
            {
                type: 'object',
                properties: {
                    data: {
                        allOf: [
                            {
                                $ref: getSchemaPath(FindConsumerListResponseDto),
                            },
                            {
                                type: 'object',
                                properties: {
                                    items: {
                                        type: 'array',
                                        items: {
                                            $ref: getSchemaPath(ConsumerResponseDto),
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };
}
