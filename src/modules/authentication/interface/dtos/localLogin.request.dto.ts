import { ApiProperty } from '@nestjs/swagger';
import { Matches, Length } from 'class-validator';

export class LocalLoginRequestDto {
    @Matches(
        // eslint-disable-next-line security/detect-unsafe-regex, sonarjs/regex-complexity
        /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
        {
            message: 'Invalid email',
        },
    )
    @ApiProperty({
        type: 'string',
        example: 'test@gmail.com',
    })
    email: string;

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
}
