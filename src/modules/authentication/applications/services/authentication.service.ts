import { Injectable } from '@nestjs/common';

import { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';

import { LoginService } from './login.service';
import { PasswordService } from './password.service';
import { SignupService } from './signup.service';
import { VerificationService } from './verification.service';

import type { ForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/forgotPassword.request.dto';
import type { LoginRequestDto } from '@/modules/authentication/interface/dtos/login.request.dto';
import type { ResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/resetPassword.request.dto';
import type { SendVerificationRequestDto } from '@/modules/authentication/interface/dtos/sendVerification.request.dto';
import type { SignupRequestDto } from '@/modules/authentication/interface/dtos/signup.request.dto';
import type { VerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/verifyVerification.request.dto';
import type { TInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly signupService: SignupService,
        private readonly loginService: LoginService,
        private readonly verificationService: VerificationService,
        private readonly passwordService: PasswordService,
    ) {}

    signup(data: SignupRequestDto): Promise<TInsertUser> {
        return this.signupService.signup(data);
    }

    login(data: LoginRequestDto): Promise<AccessTokenEntity> {
        return this.loginService.login(data);
    }

    sendVerification(data: SendVerificationRequestDto): Promise<boolean> {
        return this.verificationService.sendVerification(data);
    }

    verifyVerification(data: VerifyVerificationRequestDto): Promise<boolean> {
        return this.verificationService.verifyVerification(data);
    }

    forgotPassword(data: ForgotPasswordRequestDto): Promise<boolean> {
        return this.passwordService.forgotPassword(data);
    }

    resetPassword(data: ResetPasswordRequestDto): Promise<boolean> {
        return this.passwordService.resetPassword(data);
    }
}
