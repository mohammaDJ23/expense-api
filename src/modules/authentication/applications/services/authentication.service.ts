import { Injectable } from '@nestjs/common';

import { LocalAccountSendingVerificationService } from './localAccountSendingVerification.service';
import { LocalAccountVerificationService } from './localAccountVerification.service';
import { LocalForgotPasswordService } from './localForgotPassword.service';
import { LocalLoginService } from './localLogin.service';
import { LocalResetPasswordService } from './localResetPassword.service';
import { LocalSignupService } from './localSignup.service';
import { OauthLoginService } from './oauthLogin.service';

import type { IOauthCurrentUser } from '@/core/features/oauthCurrentUser/oauthCurrentUser.type';
import type { LocalAccountSendingVerificationRequestDto } from '@/modules/authentication/interface/dtos/localAccountSendingVerification.request.dto';
import type { LocalAccountVerificationRequestDto } from '@/modules/authentication/interface/dtos/localAccountVerification.request.dto';
import type { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import type { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import type { Response } from 'express';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly localSignupService: LocalSignupService,
        private readonly localLoginService: LocalLoginService,
        private readonly localAccountSendingVerificationService: LocalAccountSendingVerificationService,
        private readonly localAccountVerificationService: LocalAccountVerificationService,
        private readonly localForgotPasswordService: LocalForgotPasswordService,
        private readonly localResetPasswordService: LocalResetPasswordService,
        private readonly oauthLoginService: OauthLoginService,
    ) {}

    localSignup(body: LocalSignupRequestDto): Promise<boolean> {
        return this.localSignupService.execute(body);
    }

    localLogin(response: Response, body: LocalLoginRequestDto): Promise<boolean> {
        return this.localLoginService.execute({ response, body });
    }

    localAccountSendingVerification(
        body: LocalAccountSendingVerificationRequestDto,
    ): Promise<boolean> {
        return this.localAccountSendingVerificationService.execute(body);
    }

    localAccountVerification(body: LocalAccountVerificationRequestDto): Promise<boolean> {
        return this.localAccountVerificationService.execute(body);
    }

    localForgotPassword(body: LocalForgotPasswordRequestDto): Promise<boolean> {
        return this.localForgotPasswordService.execute(body);
    }

    localResetPassword(body: LocalResetPasswordRequestDto): Promise<boolean> {
        return this.localResetPasswordService.execute(body);
    }

    oauthLogin(response: Response, user: IOauthCurrentUser): Promise<boolean> {
        return this.oauthLoginService.execute({ response, user });
    }
}
