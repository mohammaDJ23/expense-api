import { Injectable } from '@nestjs/common';

import { GoogleLoginService } from './googleLogin.service';
import { LocalForgotPasswordService } from './localForgotPassword.service';
import { LocalLoginService } from './localLogin.service';
import { LocalResetPasswordService } from './localResetPassword.service';
import { LocalSendVerificationService } from './localSendVerification.service';
import { LocalSignupService } from './localSignup.service';
import { LocalVerifyVerificationService } from './localVerifyVerification.service';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';
import type { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import type { LocalSendVerificationRequestDto } from '@/modules/authentication/interface/dtos/localSendVerification.request.dto';
import type { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import type { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';

@Injectable()
export class AuthenticationService {
    // eslint-disable-next-line max-params
    constructor(
        private readonly localSignupService: LocalSignupService,
        private readonly localLoginService: LocalLoginService,
        private readonly localSendVerificationService: LocalSendVerificationService,
        private readonly localVerifyVerificationService: LocalVerifyVerificationService,
        private readonly localForgotPasswordService: LocalForgotPasswordService,
        private readonly localResetPasswordService: LocalResetPasswordService,
        private readonly googleLoginService: GoogleLoginService,
    ) {}

    localSignup(data: LocalSignupRequestDto): Promise<boolean> {
        return this.localSignupService.execute(data);
    }

    localLogin(data: LocalLoginRequestDto): Promise<AccessTokenEntity> {
        return this.localLoginService.execute(data);
    }

    localSendVerification(data: LocalSendVerificationRequestDto): Promise<boolean> {
        return this.localSendVerificationService.execute(data);
    }

    localVerifyVerification(data: LocalVerifyVerificationRequestDto): Promise<boolean> {
        return this.localVerifyVerificationService.execute(data);
    }

    localForgotPassword(data: LocalForgotPasswordRequestDto): Promise<boolean> {
        return this.localForgotPasswordService.execute(data);
    }

    localResetPassword(data: LocalResetPasswordRequestDto): Promise<boolean> {
        return this.localResetPasswordService.execute(data);
    }

    googleLogin(user: ICurrentUser): AccessTokenEntity {
        return this.googleLoginService.execute(user);
    }
}
