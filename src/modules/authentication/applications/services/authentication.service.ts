import { Injectable } from '@nestjs/common';

import { GoogleProviderService } from './googleProvider.service';
import { LocalProviderService } from './localProvider.service';

import type { ICurrentUser } from '@/core/currentUser/currentUser.interface';
import type { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
import type { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import type { LocalSendVerificationRequestDto } from '@/modules/authentication/interface/dtos/localSendVerification.request.dto';
import type { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import type { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly localProviderService: LocalProviderService,
        private readonly googleProviderService: GoogleProviderService,
    ) {}

    localSignup(data: LocalSignupRequestDto): Promise<boolean> {
        return this.localProviderService.signup(data);
    }

    localLogin(data: LocalLoginRequestDto): Promise<AccessTokenEntity> {
        return this.localProviderService.login(data);
    }

    localSendVerification(data: LocalSendVerificationRequestDto): Promise<boolean> {
        return this.localProviderService.sendVerification(data);
    }

    localVerifyVerification(data: LocalVerifyVerificationRequestDto): Promise<boolean> {
        return this.localProviderService.verifyVerification(data);
    }

    localForgotPassword(data: LocalForgotPasswordRequestDto): Promise<boolean> {
        return this.localProviderService.forgotPassword(data);
    }

    localResetPassword(data: LocalResetPasswordRequestDto): Promise<boolean> {
        return this.localProviderService.resetPassword(data);
    }

    googleLogin(user: ICurrentUser): AccessTokenEntity {
        return this.googleProviderService.login(user);
    }
}
