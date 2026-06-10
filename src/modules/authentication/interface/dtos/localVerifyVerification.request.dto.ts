import { IsJWT, IsNotEmpty } from 'class-validator';

export class LocalVerifyVerificationRequestDto {
    @IsJWT()
    @IsNotEmpty()
    token: string;
}
