import { getSchemaPath } from '@nestjs/swagger';

import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { FindReceiverListResponseDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.response.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';

// eslint-disable-next-line sonarjs/no-internal-api-use
import type { SchemaObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function httpReceiverListResponseSwaggerSchema(): SchemaObject {
    return {
        allOf: [
            {
                $ref: getSchemaPath(HttpResponseDto),
            },
            {
                type: 'object',
                required: ['data'],
                properties: {
                    data: {
                        allOf: [
                            {
                                $ref: getSchemaPath(FindReceiverListResponseDto),
                            },
                            {
                                type: 'object',
                                required: ['items'],
                                properties: {
                                    items: {
                                        type: 'array',
                                        items: {
                                            $ref: getSchemaPath(ReceiverResponseDto),
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
