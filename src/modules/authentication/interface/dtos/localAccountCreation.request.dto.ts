import { ApiProperty } from '@nestjs/swagger';
import { Matches, Length, IsJWT } from 'class-validator';

export class LocalAccountCreationRequestDto {
    // eslint-disable-next-line sonarjs/concise-regex
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,45}$/, {
        message: 'The password should be strong',
    })
    @Length(6, 45)
    @ApiProperty({
        type: 'string',
        example: 'sdIF8s*&so32difFSS',
    })
    password: string;

    @IsJWT()
    @ApiProperty({
        type: 'string',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWFkLm5vd3Jlc2lkZWgxOTk3QGdtYW...',
    })
    token: string;
}
