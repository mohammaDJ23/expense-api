import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { GoogleAuthGuard } from '@/core/authentication/googleAuth.guard';
import { HttpResponse } from '@/core/responses/http/httpResponse.decorator';
import { SerializerInterceptor } from '@/core/serializers/serializerInterceptor.decorator';
import { CurrentUser } from '@/core/user/currentUser.decorator';
import { GoogleLoginService } from '@/modules/authentication/applications/services/googleLogin.service';
import { LocalForgotPasswordService } from '@/modules/authentication/applications/services/localForgotPassword.service';
import { LocalLoginService } from '@/modules/authentication/applications/services/localLogin.service';
import { LocalResetPasswordService } from '@/modules/authentication/applications/services/localResetPassword.service';
import { LocalSendVerificationService } from '@/modules/authentication/applications/services/localSendVerification.service';
import { LocalSignupService } from '@/modules/authentication/applications/services/localSignup.service';
import { LocalVerifyVerificationService } from '@/modules/authentication/applications/services/localVerifyVerification.service';
import { LocalForgotPasswordRequestDto } from '@/modules/authentication/interface/dtos/localForgotPassword.request.dto';
import { LocalLoginRequestDto } from '@/modules/authentication/interface/dtos/localLogin.request.dto';
import { LocalResetPasswordRequestDto } from '@/modules/authentication/interface/dtos/localResetPassword.request.dto';
import { LocalSendVerificationRequestDto } from '@/modules/authentication/interface/dtos/localSendVerification.request.dto';
import { LocalSignupRequestDto } from '@/modules/authentication/interface/dtos/localSignup.request.dto';
import { LocalVerifyVerificationRequestDto } from '@/modules/authentication/interface/dtos/localVerifyVerification.request.dto';
import { LoginResponseDto } from '@/modules/authentication/interface/dtos/login.response.dto';

import {
    SUCCESS_SIGNUP_MESSAGE,
    SUCCESS_SEND_VERIFICATION_MESSAGE,
    SUCCESS_VERIFY_VERIFICATION_MESSAGE,
    SUCCESS_LOGIN_MESSAGE,
    SUCCESS_FORGOT_PASSWORD_MESSAGE,
    SUCCESS_RESET_PASSWORD_MESSAGE,
} from './controllers.constants';

import type { ICurrentUser } from '@/core/user/currentUser.interface';
import type { AccessTokenEntity } from '@/modules/authentication/domain/entities/accessToken.entity';

@Controller({ version: '1', path: 'api/authentication' })
export class AuthenticationController {
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

    @Post('local/signup')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_SIGNUP_MESSAGE, HttpStatus.CREATED)
    localSignup(@Body() body: LocalSignupRequestDto): Promise<boolean> {
        return this.localSignupService.execute(body);
    }

    @Post('local/login')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @HttpResponse(SUCCESS_LOGIN_MESSAGE, HttpStatus.OK)
    @SerializerInterceptor(LoginResponseDto)
    localLogin(@Body() body: LocalLoginRequestDto): Promise<AccessTokenEntity> {
        return this.localLoginService.execute(body);
    }

    @Post('local/verification/send')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_SEND_VERIFICATION_MESSAGE, HttpStatus.OK)
    localSendVerification(@Body() body: LocalSendVerificationRequestDto): Promise<boolean> {
        return this.localSendVerificationService.execute(body);
    }

    @Post('local/verification/verify')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_VERIFY_VERIFICATION_MESSAGE, HttpStatus.OK)
    localVerifyVerification(@Body() body: LocalVerifyVerificationRequestDto): Promise<boolean> {
        return this.localVerifyVerificationService.execute(body);
    }

    @Post('local/forgot-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_FORGOT_PASSWORD_MESSAGE, HttpStatus.OK)
    localForgotPassword(@Body() body: LocalForgotPasswordRequestDto): Promise<boolean> {
        return this.localForgotPasswordService.execute(body);
    }

    @Post('local/reset-password')
    @Throttle({ default: { limit: 2, ttl: 300000 } })
    @HttpResponse(SUCCESS_RESET_PASSWORD_MESSAGE, HttpStatus.OK)
    localResetPassword(@Body() body: LocalResetPasswordRequestDto): Promise<boolean> {
        return this.localResetPasswordService.execute(body);
    }

    @Get('google')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
    google(): void {}

    @Get('google/callback')
    @Throttle({ default: { limit: 3, ttl: 60000 } })
    @UseGuards(GoogleAuthGuard)
    @HttpResponse(SUCCESS_LOGIN_MESSAGE, HttpStatus.OK)
    @SerializerInterceptor(LoginResponseDto)
    googleLogin(@CurrentUser() user: ICurrentUser): AccessTokenEntity {
        return this.googleLoginService.execute(user);
    }
}
