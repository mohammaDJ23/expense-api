import { ApiProperty } from '@nestjs/swagger';
import { Matches, Length, IsJWT, IsNotEmpty } from 'class-validator';

export class LocalResetPasswordRequestDto {
    // eslint-disable-next-line sonarjs/concise-regex
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,45}$/, {
        message: 'The new password should be strong',
    })
    @Length(6, 45)
    @ApiProperty({
        type: 'string',
        example: 'sdIF8s*&so32difFSS',
    })
    newPassword: string;

    @IsJWT()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFtbWFkLm5vd3Jlc2lkZWgxOTk3QGdtYW...',
    })
    token: string;
}
