import { getSchemaPath } from '@nestjs/swagger';

import { HttpResponseDto } from '@/core/features/responses/http/httpResponse.dto';
import { FindUserListResponseDto } from '@/modules/user/interfaces/dtos/findUserList.response.dto';
import { UserResponseDto } from '@/modules/user/interfaces/dtos/user.response.dto';

// eslint-disable-next-line sonarjs/no-internal-api-use
import type { SchemaObject } from 'node_modules/@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function httpUserListResponseSwaggerSchema(): SchemaObject {
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
                                $ref: getSchemaPath(FindUserListResponseDto),
                            },
                            {
                                type: 'object',
                                properties: {
                                    items: {
                                        type: 'array',
                                        items: {
                                            $ref: getSchemaPath(UserResponseDto),
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
