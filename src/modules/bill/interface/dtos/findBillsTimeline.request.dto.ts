import { IsDateString, IsOptional } from 'class-validator';

export class FindBillsTimelineRequestDto {
    @IsOptional()
    @IsDateString(
        { strictSeparator: true },
        { message: 'start must be in ISO 8601 format: YYYY-MM-DDThh:mm:ss.sssZ' },
    )
    start: string | null = null;

    @IsOptional()
    @IsDateString(
        { strictSeparator: true },
        { message: 'end must be in ISO 8601 format: YYYY-MM-DDThh:mm:ss.sssZ' },
    )
    end: string | null = null;
}
