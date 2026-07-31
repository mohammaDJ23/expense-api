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

export class UpdateBillRequestDto {
    @IsUUID()
    id: string;

    @IsNumberString()
    @Length(1, 12)
    @Matches(/^[1-9]\d*$/, { message: 'Amount must be a positive integer without decimal' })
    amount: string;

    @IsString()
    @Length(3, 500)
    // eslint-disable-next-line security/detect-unsafe-regex
    @Matches(/^[^\s]+(\s+[^\s]+)*$/, { message: 'Invalid description.' })
    description: string;

    @IsDateString(
        { strictSeparator: true },
        { message: 'PurchasedAt must be in ISO 8601 format: YYYY-MM-DDThh:mm:ss.sssZ' },
    )
    purchasedAt: string;

    @IsUUID()
    receiverId: string;

    @IsUUID()
    locationId: string;

    @IsArray()
    @IsUUID('all', { each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
    @ArrayUnique()
    consumerIds: string[];
}
