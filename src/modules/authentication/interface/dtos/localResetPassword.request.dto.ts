import { Matches, Length, IsJWT, IsNotEmpty } from 'class-validator';

export class LocalResetPasswordRequestDto {
    // eslint-disable-next-line sonarjs/concise-regex
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,45}$/, {
        message: 'The new password should be strong',
    })
    @Length(6, 45)
    newPassword: string;

    @IsJWT()
    @IsNotEmpty()
    token: string;
}
