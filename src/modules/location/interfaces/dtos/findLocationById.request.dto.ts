import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindLocationByIdRequestDto {
    @IsUUID()
    @ApiProperty({
        type: 'string',
        example: '9f466902-0a1d-4a24-b7bb-890434bc5adb',
    })
    id: string;
}
