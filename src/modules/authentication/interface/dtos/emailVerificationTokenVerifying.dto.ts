import { IsJWT, IsNotEmpty } from 'class-validator';

export class EmailVerificationTokenVerifyingDto {
    @IsJWT()
    @IsNotEmpty()
    token: string;
}
