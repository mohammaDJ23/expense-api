import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Matches, Length, IsOptional } from 'class-validator';

export class UpdateUserRequestDto {
    @IsOptional()
    @IsString()
    @Length(3, 50)
    // eslint-disable-next-line security/detect-unsafe-regex
    @Matches(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/, { message: 'Invalid firstname' })
    @ApiPropertyOptional({
        type: 'string',
        example: 'User first name',
        nullable: true,
    })
    firstName?: string | null;

    @IsOptional()
    @IsString()
    @Length(3, 50)
    // eslint-disable-next-line security/detect-unsafe-regex
    @Matches(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/, { message: 'Invalid lastname' })
    @ApiPropertyOptional({
        type: 'string',
        example: 'User last name',
        nullable: true,
    })
    lastName?: string | null;

    @IsOptional()
    @IsString()
    @Length(1, 20)
    // eslint-disable-next-line sonarjs/single-char-in-character-classes, sonarjs/concise-regex, no-useless-escape
    @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, {
        message: 'Invalid phone number',
    })
    @ApiPropertyOptional({
        type: 'string',
        example: '09121112233',
        nullable: true,
    })
    phone?: string | null;
}
