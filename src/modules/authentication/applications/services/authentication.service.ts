import { Injectable } from '@nestjs/common';

import { GoogleLoginService } from './googleLogin.service';
import { LocalForgotPasswordService } from './localForgotPassword.service';
import { LocalLoginService } from './localLogin.service';
import { LocalResetPasswordService } from './localResetPassword.service';
import { LocalSendVerificationService } from './localSendVerification.service';
import { LocalSignupService } from './localSignup.service';
import { LocalVerifyVerificationService } from './localVerifyVerification.service';

import type { ICurrentUser } from '@/core/authentication/currentUser.type';
import type { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import type { LocalSendVerificationRequestDto } from '@/modules/authentication/interface/dtos/localSendVerification.request.dto';
import type { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import type { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { Response } from 'express';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly localSignupService: LocalSignupService,
        private readonly localLoginService: LocalLoginService,
        private readonly localSendVerificationService: LocalSendVerificationService,
        private readonly localVerifyVerificationService: LocalVerifyVerificationService,
        private readonly localForgotPasswordService: LocalForgotPasswordService,
        private readonly localResetPasswordService: LocalResetPasswordService,
        private readonly googleLoginService: GoogleLoginService,
    ) {}

    localSignup(body: LocalSignupRequestDto): Promise<boolean> {
        return this.localSignupService.execute(body);
    }

    localLogin(response: Response, body: LocalLoginRequestDto): Promise<ISelectUser> {
        return this.localLoginService.execute({ response, body });
    }

    localSendVerification(body: LocalSendVerificationRequestDto): Promise<boolean> {
        return this.localSendVerificationService.execute(body);
    }

    localVerifyVerification(body: LocalVerifyVerificationRequestDto): Promise<boolean> {
        return this.localVerifyVerificationService.execute(body);
    }

    localForgotPassword(body: LocalForgotPasswordRequestDto): Promise<boolean> {
        return this.localForgotPasswordService.execute(body);
    }

    localResetPassword(body: LocalResetPasswordRequestDto): Promise<boolean> {
        return this.localResetPasswordService.execute(body);
    }

    googleLogin(response: Response, user: ICurrentUser): Promise<ISelectUser> {
        return this.googleLoginService.execute({ response, user });
    }
}
