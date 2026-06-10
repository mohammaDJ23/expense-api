import { Injectable } from '@nestjs/common';

import { LocalLoginService } from './localLogin.service';
import { LocalPasswordService } from './localPassword.service';
import { LocalSignupService } from './localSignup.service';
import { LocalVerificationService } from './localVerification.service';

import type { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
import type { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import type { LocalSendVerificationRequestDto } from '@/modules/authentication/interface/dtos/localSendVerification.request.dto';
import type { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import type { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';

@Injectable()
export class LocalProviderService {
    constructor(
        private readonly localSignupService: LocalSignupService,
        private readonly localLoginService: LocalLoginService,
        private readonly localVerificationService: LocalVerificationService,
        private readonly localPasswordService: LocalPasswordService,
    ) {}

    signup(data: LocalSignupRequestDto): Promise<boolean> {
        return this.localSignupService.signup(data);
    }

    login(data: LocalLoginRequestDto): Promise<AccessTokenEntity> {
        return this.localLoginService.login(data);
    }

    sendVerification(data: LocalSendVerificationRequestDto): Promise<boolean> {
        return this.localVerificationService.sendVerification(data);
    }

    verifyVerification(data: LocalVerifyVerificationRequestDto): Promise<boolean> {
        return this.localVerificationService.verifyVerification(data);
    }

    forgotPassword(data: LocalForgotPasswordRequestDto): Promise<boolean> {
        return this.localPasswordService.forgotPassword(data);
    }

    resetPassword(data: LocalResetPasswordRequestDto): Promise<boolean> {
        return this.localPasswordService.resetPassword(data);
    }
}
