import { IsJWT, IsNotEmpty } from 'class-validator';

export class LocalAccountVerificationRequestDto {
    @IsJWT()
    @IsNotEmpty()
    token: string;
}
