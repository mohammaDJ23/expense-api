import { Matches, Length, IsJWT } from 'class-validator';

export class LocalSignupRequestDto {
    // eslint-disable-next-line sonarjs/concise-regex
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,45}$/, {
        message: 'The password should be strong',
    })
    @Length(6, 45)
    password: string;

    @IsJWT()
    token: string;
}
