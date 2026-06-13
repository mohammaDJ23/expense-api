import {
    IsString,
    IsNumberString,
    Length,
    IsArray,
    ArrayMinSize,
    ArrayMaxSize,
    Matches,
    ValidateIf,
    IsDateString,
    ArrayUnique,
} from 'class-validator';

export class CreateBillRequestDto {
    @IsNumberString()
    @Length(1, 12)
    @Matches(/^[1-9]\d*$/, { message: 'Amount must be a positive integer without decimal' })
    amount: string;

    @IsString()
    @Length(3, 50)
    // eslint-disable-next-line security/detect-unsafe-regex
    @Matches(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/, { message: 'Invalid receiver' })
    receiver: string;

    @IsArray()
    @IsString({ each: true })
    @Length(3, 50, { each: true })
    @ArrayMinSize(1)
    @ArrayMaxSize(20)
    @ArrayUnique()
    // eslint-disable-next-line security/detect-unsafe-regex
    @Matches(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/, { each: true, message: 'Invalid consumers' })
    consumers: string[];

    @IsString()
    @Length(3, 500)
    // eslint-disable-next-line security/detect-unsafe-regex
    @Matches(/^[^\s]+(\s+[^\s]+)*$/, { message: 'Invalid description.' })
    description: string;

    @ValidateIf((_object, value) => value !== undefined && value !== null)
    @IsDateString(
        { strictSeparator: true },
        { message: 'PurchasedAt must be in ISO 8601 format: YYYY-MM-DDThh:mm:ss.sssZ' },
    )
    purchasedAt: string | null;

    @IsString()
    @Length(3, 50)
    // eslint-disable-next-line security/detect-unsafe-regex
    @Matches(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/, { message: 'Invalid location' })
    location: string;
}
