import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNumberString,
    Length,
    IsArray,
    ArrayMinSize,
    ArrayMaxSize,
    Matches,
    IsDateString,
    ArrayUnique,
    IsUUID,
} from 'class-validator';

export class CreateBillRequestDto {
    @IsNumberString()
    @Length(1, 12)
    @Matches(/^[1-9]\d*$/, { message: 'Amount must be a positive integer without decimal' })
    @ApiProperty({
        type: 'string',
        example: '1000',
    })
    amount: string;

    @IsString()
    @Length(3, 500)
    // eslint-disable-next-line security/detect-unsafe-regex
    @Matches(/^[^\s]+(\s+[^\s]+)*$/, { message: 'Invalid description.' })
    @ApiProperty({
        type: 'string',
        example: 'Some description',
    })
    description: string;

    @IsDateString(
        { strictSeparator: true },
        { message: 'PurchasedAt must be in ISO 8601 format: YYYY-MM-DDThh:mm:ss.sssZ' },
    )
    @ApiProperty({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
    })
    purchasedAt: string;

    @IsUUID()
    @ApiProperty({
        type: 'string',
        example: '95436902-0a1d-4a24-b7bb-890464bc5adb',
    })
    receiverId: string;

    @IsUUID()
    @ApiProperty({
        type: 'string',
        example: '9f411102-0a1d-4a24-b7bb-8904789c5adb',
    })
    locationId: string;

    @IsArray()
    @IsUUID('all', { each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
    @ArrayUnique()
    @ApiProperty({
        type: 'string',
        example: ['76566902-0a1d-4a24-b7bb-890434bc5988', '76566902-0a1d-1234-b7bb-895554bc5988'],
        isArray: true,
    })
    consumerIds: string[];
}
