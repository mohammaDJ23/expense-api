import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class FindBillsTimelineRequestDto {
    @IsOptional()
    @IsDateString(
        { strictSeparator: true },
        { message: 'start must be in ISO 8601 format: YYYY-MM-DDThh:mm:ss.sssZ' },
    )
    @ApiPropertyOptional({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
        nullable: true,
    })
    start: string | null = null;

    @IsOptional()
    @IsDateString(
        { strictSeparator: true },
        { message: 'end must be in ISO 8601 format: YYYY-MM-DDThh:mm:ss.sssZ' },
    )
    @ApiPropertyOptional({
        type: 'string',
        example: '2026-09-25T08:16:10.528Z',
        nullable: true,
    })
    end: string | null = null;
}
