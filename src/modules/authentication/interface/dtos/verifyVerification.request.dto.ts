import { IsJWT, IsNotEmpty } from 'class-validator';

export class VerifyVerificationRequestDto {
    @IsJWT()
    @IsNotEmpty()
    token: string;
}
