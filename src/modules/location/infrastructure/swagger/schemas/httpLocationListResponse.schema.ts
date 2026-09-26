import { getSchemaPath } from '@nestjs/swagger';

import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { FindLocationListResponseDto } from '@/modules/location/interfaces/dtos/findLocationList.response.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';

// eslint-disable-next-line sonarjs/no-internal-api-use
import type { SchemaObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function httpLocationListResponseSwaggerSchema(): SchemaObject {
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
                                $ref: getSchemaPath(FindLocationListResponseDto),
                            },
                            {
                                type: 'object',
                                properties: {
                                    items: {
                                        type: 'array',
                                        items: {
                                            $ref: getSchemaPath(LocationResponseDto),
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
