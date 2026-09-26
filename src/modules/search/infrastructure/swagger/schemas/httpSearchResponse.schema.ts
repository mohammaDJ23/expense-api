import { getSchemaPath } from '@nestjs/swagger';

import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { BillResponseDto } from '@/modules/bill/interface/dtos/bill.response.dto';
import { ConsumerResponseDto } from '@/modules/consumer/interfaces/dtos/consumer.response.dto';
import { LocationResponseDto } from '@/modules/location/interfaces/dtos/location.response.dto';
import { ReceiverResponseDto } from '@/modules/receiver/interfaces/dtos/receiver.response.dto';
import { SearchResponseDto } from '@/modules/search/interfaces/dtos/search.response.dto';

// eslint-disable-next-line sonarjs/no-internal-api-use
import type { SchemaObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function httpSearchResponseSwaggerSchema(): SchemaObject {
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
                                $ref: getSchemaPath(SearchResponseDto),
                            },
                            {
                                type: 'object',
                                properties: {
                                    bills: {
                                        type: 'array',
                                        items: {
                                            $ref: getSchemaPath(BillResponseDto),
                                        },
                                    },
                                    receivers: {
                                        type: 'array',
                                        items: {
                                            $ref: getSchemaPath(ReceiverResponseDto),
                                        },
                                    },
                                    locations: {
                                        type: 'array',
                                        items: {
                                            $ref: getSchemaPath(LocationResponseDto),
                                        },
                                    },
                                    consumers: {
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
