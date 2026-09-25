import { ApiProperty } from '@nestjs/swagger';

import type { IException } from './exception.type';

export class ExceptionDto implements IException {
    @ApiProperty({
        type: 'number',
        example: 0,
    })
    statusCode: number;

    @ApiProperty({
        type: 'string',
        example: 'Some error',
    })
    message: string;

    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
    })
    timestamp: string;
}
