import { Injectable } from '@nestjs/common';

import { LocalAccountCreationService } from './localAccountCreation.service';
import { LocalAccountInitiationService } from './localAccountInitiation.service';
import { LocalForgotPasswordService } from './localForgotPassword.service';
import { LocalLoginService } from './localLogin.service';
import { LocalResetPasswordService } from './localResetPassword.service';
import { LocalSignupService } from './localSignup.service';
import { LocalSignupInitiationService } from './localSignupInitiation.service';
import { OauthLoginService } from './oauthLogin.service';

import type { IOauthCurrentUser } from '@/core/features/oauthCurrentUser/oauthCurrentUser.type';
import type { LocalAccountCreationRequestDto } from '@/modules/authentication//interface/dtos/localAccountCreation.request.dto';
import type { LocalAccountInitiationRequestDto } from '@/modules/authentication/interface/dtos/localAccountInitiation.request.dto';
import type { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import type { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import type { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import type { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import type { LocalSignupInitiationRequestDto } from '@/modules/authentication/interface/dtos/localSignupInitiation.request.dto';
import type { Response } from 'express';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly localSignupService: LocalSignupService,
        private readonly localLoginService: LocalLoginService,
        private readonly localForgotPasswordService: LocalForgotPasswordService,
        private readonly localResetPasswordService: LocalResetPasswordService,
        private readonly oauthLoginService: OauthLoginService,
        private readonly localSignupInitiationService: LocalSignupInitiationService,
        private readonly localAccountInitiationService: LocalAccountInitiationService,
        private readonly localAccountCreationService: LocalAccountCreationService,
    ) {}

    localSignupInitiation(body: LocalSignupInitiationRequestDto): Promise<boolean> {
        return this.localSignupInitiationService.execute({
            email: body.email,
        });
    }

    localSignup(body: LocalSignupRequestDto): Promise<boolean> {
        return this.localSignupService.execute(body);
    }

    localLogin(response: Response, body: LocalLoginRequestDto): Promise<boolean> {
        return this.localLoginService.execute({ response, body });
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

    localAccountInitiation(body: LocalAccountInitiationRequestDto): Promise<boolean> {
        return this.localAccountInitiationService.execute(body);
    }

    localAccountCreation(body: LocalAccountCreationRequestDto): Promise<boolean> {
        return this.localAccountCreationService.execute(body);
    }
}
