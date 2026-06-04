import { IsJWT, IsNotEmpty } from 'class-validator';

export class VerifyVerificationDto {
    @IsJWT()
    @IsNotEmpty()
    token: string;
}
