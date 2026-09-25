import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length, Matches } from 'class-validator';

export class UpdateConsumerRequestDto {
    @IsUUID()
    @ApiProperty({
        type: 'string',
        example: '9f466902-0a1d-4a24-b7bb-890434bc5adb',
    })
    id: string;

    @IsString()
    @Length(3, 50)
    // eslint-disable-next-line security/detect-unsafe-regex
    @Matches(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/, { message: 'Invalid consumer' })
    @ApiProperty({
        type: 'string',
        example: 'Mr test',
    })
    name: string;
}
