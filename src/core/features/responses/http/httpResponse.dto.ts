import { ApiProperty } from '@nestjs/swagger';

import type { IHttpResponse } from './httpResponse.type';

export class HttpResponseDto<T = unknown> implements IHttpResponse<T> {
    @ApiProperty({
        type: 'string',
        example: 'Some message',
    })
    message: string;

    @ApiProperty()
    data: T;

    @ApiProperty({
        type: 'number',
        example: 0,
    })
    statusCode: number;

    @ApiProperty({
        type: 'boolean',
        example: true,
    })
    success: boolean;

    @ApiProperty({
        type: 'boolean',
        example: false,
    })
    error: boolean;
}
